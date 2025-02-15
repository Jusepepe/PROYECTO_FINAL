import "dotenv/config"
import { OauthModel } from "../models/oauth.model.js";
import { Token } from "../module/token.js";

export class OauthController{

    static async githubOauth(req, res){
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
    }

    static async githubCallback(req, res){

        try{
        if(req.session.user) return res.json({ message : "El usuario ya está logeado" })
        const code = req.query.code;

        const [user, cart] = await OauthModel.githubCallback(code);

        if(!user) return res.json({ message : "Error al crear usuario" });

        const token = Token.createToken(user.id, user.correo, cart.id);
                
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })
        .json(user)
    }catch{}
    }

    static async githubCallbackTest(req, res){
        const code = req.query.code;
        res.json(code)
    }
}