import { DataTypes, Model, Op } from "sequelize";
import { sequelize as database } from "../config/dbconfig.js";
import bcrypt from "bcrypt"

export class UserModel extends Model {
    static async getUsers(){
        const users = await UserModel.findAll({attributes: {exclude:'contraseña'}});
        return users
    }

    static async createUser( correo, contraseña ){
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const userCreated = await UserModel.create({
            correo,
            contraseña : hashedPassword,
            authMethod : "Traditional"
        });
        return userCreated
    }

    static async createOauthUser( input ){
        const { correo, oauthID, authMethod } = input; 
        const userCreated = await UserModel.create({
            correo,
            oauthID,
            authMethod
        });
        return userCreated
    }

    static async getUserbyEmail(correo){
        const user = await UserModel.findOne({ where: { correo } });
        return user
    }

    static async userLogin(correo, contraseña){
        const user = await UserModel.getUserbyEmail(correo);
        if(!user) return [null , null];
        const isValid = await bcrypt.compare(contraseña, user.contraseña);
        if(!isValid) return [null, { user : { notValid : true }} ];
        const { contraseña: _, ...publicUser } = user.dataValues;
        return [publicUser, user]  
    }

    static async deleteUser(id){
        const userDeleted = await UserModel.update(
            {
                estadoCuenta : false
            },
            {
                where: {id}
            }
        );
        return userDeleted
    }

    static async getUserbyID(id){
        const user = await UserModel.findOne({
            where:{
                [Op.or] : {
                    id: id,
                    oauthID: id
                }
            }
        });
        return user
    }

    static async getUserbyOauthID(oauthID){
        const user = await UserModel.findOne({ where : { oauthID }});
        return user
    }
}

UserModel.init(
    {
        correo: {
            type: DataTypes.STRING,
            validate: { isEmail: true },
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING
        },
        estadoCuenta:{
            type: DataTypes.BOOLEAN,
            defaultValue : true
        },
        authMethod:{
            type: DataTypes.STRING
        },
        oauthID:{
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false,
        sequelize: database,
        modelName: 'User'
    }
)