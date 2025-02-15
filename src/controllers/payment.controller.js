import { sequelize } from "../config/dbconfig.js";
import { PaymentModel, ProductModel, CartModel } from "../models/index.js";

export class PaymentController{

    static async getPayments(req, res){
        const payments = await PaymentModel.getPayments();
        if(!payments) return res.json({ message: "Tabla de pagos vacía" });
        res.json(payments)
    }

    static async getPaymentsByUser(req, res){
        const userID = req.session.user.id;
        const payments = await PaymentModel.getPaymentsbyUser(userID);
        if(!payments) return res.json({ message : "No se encontraron pagos!"});
        res.json(payments)
    }

    static async getPayments(req, res){
        const payments = await PaymentModel.getPayments();
        if(!payments) return res.json({ message : "No se encontraron pagos!"});
        res.json(payments)
    }

    static async startPayment(req, res){
        const cartID = req.session.user.cartID;
        const cart = await CartModel.getCartbyID(cartID);

        if(cart.estado === "Pagado") return res.json({ message : "Articulos pagados" });
        if(!cart) return res.json({ message : "No existe el carrito" });

        const products = await cart.getProducts();
        if(!products.length) return res.json({ message : "El carrito está vacío" });

        const redirectUrl = await PaymentModel.startPayment(products);
        if(!redirectUrl) return res.json({ message : "No  se pudo crear la sesión de pago"});

        res.redirect(303, redirectUrl);
    }

    static async createPayment(req, res){
        const cartID = req.session.user.cartID;
        const sessionID = req.query.session_id;
        const userID = req.session.user.id;
        const payment = await PaymentModel.createPayment(sessionID, userID, cartID);
        if(!payment) return res.json({ message : "No se puede crear el pago" });
        if(payment.status === "paid"){
            const cart = await CartModel.getCartbyID(cartID);
            await cart.update({ estado : "Pagado"});
            const products = await cart.getProducts();
            products.forEach(product => {
                product.update({ stock : sequelize.literal(`stock +${-product.Order.quantity}`)});
            })
        }
        res.json(payment)
    }
}