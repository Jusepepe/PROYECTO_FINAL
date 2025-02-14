import { DataTypes, Model, where } from "sequelize";
import { sequelize as database } from "../config/dbconfig.js";

export class ProductModel extends Model {

    static async getProducts(){
        const products = await ProductModel.findAll();
        return products
    }

    static async getProductbyID(id){
        const product = await ProductModel.findByPk(id);
        return product
    }

    static async createProduct(nombre, stock, precio){
        const product = await ProductModel.create({ nombre, stock, precio });
        return product
    }

    static async updateProduct(id, input){
        const productUpdated = await ProductModel.update(
            input,
            {
                where:{ id }
            }
        )
        return productUpdated
    }

    static async deleteProduct(id){
        const productDeleted = await ProductModel.destroy({ where : { id } })
        return productDeleted
    }

    static async increaseStock(id, quantity){
        const isIncreased = await ProductModel.increment({ stock : quantity }, { where:{id} });
        return isIncreased
    }

}

ProductModel.init(
    {
        nombre: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        precio: {
            type: DataTypes.FLOAT
        }

    },
    {
        timestamps: false,
        sequelize: database,
        modelName: 'Product'
    }
)