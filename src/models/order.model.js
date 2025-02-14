import { DataTypes, Model } from "sequelize";
import { sequelize as database } from "../config/dbconfig.js";

export class OrderModel extends Model{

}

OrderModel.init(
    {
        quantity:{
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false,
        sequelize: database,
        modelName: 'Order'
    }
)