import { UserModel } from "../models/index.js";
import { Token } from "../module/token.js";

export class UserController{

    static async getUserbyID(req, res){
        const id  = req.session.user.id;
        const user = await UserModel.getUserbyID(id)
        if(!user){
            return res.json({ message: "Usuario no encontrado" })
        }
        const { contraseña: _, ...publicUser } = user.dataValues
        res.json(publicUser)
    }

    static async getUsers(req, res){
        const users = await UserModel.getUsers()
        if(!users){
            return res.json({ message: "No hay usuarios" })
        }
        res.json(users)
    }

    static async getUserCarts(req, res){
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
    }

    static async getUserPayments(req, res){
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
    }

    static async register(req, res){
        const { correo, contraseña } = req.body
        const user = await UserModel.createUser(correo, contraseña)
        if(!user){
            return res.json({ message : "No se pudo crear el usuario"})
        }
        res.json(user.id)
    }

    static async deleteUser(req, res){
        const id = req.params.id
        const user = await UserModel.deleteUser(id)
        if(!user){
            return res.json({ message: `No se eliminó el usuario con ID: ${id}`})
        }
        res.json({ message: `Se eliminó el usuario con ID: ${id}`})
    }

    static async updateUser(req, res){
        const id = req.params.id
        const input = req.body
        const user = await UserModel.updateUser(id, input)
        if(!user){
            return res.json({ message: `No se actualizó el usuario con ID: ${id}`})
        }
        res.json({ message: `Se actualizó el usuario con ID: ${id}`, id: id})
    }

    static async login(req, res){
        
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