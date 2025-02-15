import { DataTypes, Model } from "sequelize";
import { sequelize as database } from "../config/dbconfig.js";
import { Stripe } from "stripe"

export class PaymentModel extends Model{

    static async getPayments(){
        const payments = await PaymentModel.findAll();
        return payments
    }

    static async getPaymentsbyUser(userID){
        const payments = await PaymentModel.findAll({ where : { userID } })
        return payments
    }

    static async listPayments(){
        const payments = await PaymentModel.findAll()
        return payments
    }

    static async startPayment(products){
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const cartID = products[0].Order.CartId
        const line_items = []
        products.forEach(product => {
            line_items.push({
                price_data :{
                    unit_amount : product.precio * 100,
                    currency : "pen",
                    product_data: {
                        name: product.nombre
                    }
                },
                quantity : product.Order.quantity
            })
        });
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode : "payment",
            success_url : `https://proyecto-final-untf.onrender.com/payments/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url : `https://proyecto-final-untf.onrender.com/payments/cancel?session_id={CHECKOUT_SESSION_ID}`
        })
        console.log(session.url)
        return session.url
    }

    static async createPayment(sessionID, userID, cartID){
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const session = await stripe.checkout.sessions.retrieve(sessionID)
        if(!session) return null
        const { currency, amount_total, payment_status } = session
        const payment = await PaymentModel.create({
            _id : sessionID,
            currency,
            amount: amount_total,
            status : payment_status,
            gateway : "Stripe",
            userID,
            cartID
        })
        return payment
    }

}

PaymentModel.init(
    {
        amount:{
            type : DataTypes.FLOAT,
            allowNull : false 
        },
        currency:{
            type: DataTypes.STRING
        },
        gateway:{
            type : DataTypes.STRING,
            allowNull : false
        },
        status:{
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        timestamps: false,
        sequelize: database,
        modelName: 'Payment'
    }
)