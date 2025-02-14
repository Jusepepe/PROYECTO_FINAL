import { DataTypes, Model } from "sequelize";
import { sequelize as database } from "../config/dbconfig.js";

export class CartModel extends Model {
    static async createCart(userID){
        const cartCreated = await CartModel.create({
            userID
        });
        return cartCreated
    }

    static async deleteCart(id){
        const cartDeleted = await CartModel.update({
            estado: "Eliminado"
            },
            {
                where: { id }
            }
        )
        return cartDeleted
    }

    static async getCartbyID(id){
        const cart = await CartModel.findByPk(id);
        return cart
    }

    static async getCarts(){
        const carts = await CartModel.findAll();
        return carts
    }
}

CartModel.init(
    {
        estado: {
            type: DataTypes.STRING,
            defaultValue: "Activo"
        }
    },
    {
        timestamps: false,
        sequelize: database,
        modelName: 'Cart'
    }
)