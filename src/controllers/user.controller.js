import { UserModel } from "../models/index.js";
import { Token } from "../module/token.js";

export class UserController{

    static async getUserbyID(req, res){
        
        try{
        const id  = req.session.user.id;
        const user = await UserModel.getUserbyID(id)
        if(!user){
            return res.json({ message: "Usuario no encontrado" })
        }
        const { contraseña: _, ...publicUser } = user.dataValues
        res.json(publicUser)
    }catch{}
    }

    static async getUsers(req, res){
        try{
        const users = await UserModel.getUsers()
        if(!users){
            return res.json({ message: "No hay usuarios" })
        }
        res.json(users)
    }catch{}
    }

    static async getUserCarts(req, res){
        try{
        const id = req.session.user.id
        const user = await UserModel.getUserbyID(id)
        if(!user){
            return res.json({ message : "Usuario no econtrado" })
        }
        const cart = await user.getCart()
        if(!cart){
            return res.json({ message : "No tiene carritos"})
        }
        res.json(cart)
    }catch{}
    }

    static async getUserPayments(req, res){
        try{
        const id = req.session.user.id
        const user = await UserModel.getUserbyID(id)
        if(!user){
            return res.json({ message : "Usuario no econtrado" })
        }
        const payments = await user.getPayments()
        if(!payments.length){
            return res.json({ message : "No tiene pagos"})
        }
        res.json(payments)
    }catch{}
    }

    static async register(req, res){
        try{
        const { correo, contraseña } = req.body
        const user = await UserModel.createUser(correo, contraseña)
        if(!user){
            return res.json({ message : "No se pudo crear el usuario"})
        }
        res.json(user.id)
    }catch{}
    }

    static async deleteUser(req, res){
        try{
        const id = req.params.id
        const user = await UserModel.deleteUser(id)
        if(!user){
            return res.json({ message: `No se eliminó el usuario con ID: ${id}`})
        }
        res.json({ message: `Se eliminó el usuario con ID: ${id}`})
    }catch{}
    }

    static async updateUser(req, res){
        try{
        const id = req.params.id
        const input = req.body
        const user = await UserModel.updateUser(id, input)
        if(!user){
            return res.json({ message: `No se actualizó el usuario con ID: ${id}`})
        }
        res.json({ message: `Se actualizó el usuario con ID: ${id}`, id: id})
    }catch{}
    }

    static async login(req, res){
        try{
        
        if(req.session.user) return res.json({ message : "El usuario ya está logeado"});

        const { correo, contraseña } = req.body;
        if(!contraseña || !correo) return res.json({ message : "Campos Vacíos"});

        const [publicUser, user] = await UserModel.userLogin(correo, contraseña);
        if(!user||!user.estadoCuenta) return res.json({ message: "No existe el usuario"});
        if(user.notValid) return res.json({ message: "Contraseña incorrecta"});
        if(user.oauthID) return res.json({ message : "Reintentar logeo por Oauth"});

        let cart = await user.getCart();

        if(!cart) cart = await user.createCart();

        const token = Token.createToken(user.id, user.correo, cart.id);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        .send(publicUser)
    }catch{}
    }

    static async logout(req, res){
        try{
            const id = req.session.user.id;
            res.clearCookie('access_token')
            .json({ message: `Usuario deslogeado: ${id}`})
        }catch(e){
            res.json({ message : e.message})
        }
    }

}