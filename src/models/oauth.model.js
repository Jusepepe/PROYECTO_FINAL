import axios from "axios";
import { UserModel } from "../models/index.js";

export class OauthModel{

    static async githubCallback(code){

        const url = `https://github.com/login/oauth/access_token`;
        const body = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET_KEY,
            code
        };
        const options = { headers: { accept: "application/json" } };

        const accessTokenOptions = { 
            method: 'POST',
            url : `https://github.com/login/oauth/access_token`,
            headers : { 
                accept: "application/json" 
            },
            body : {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_SECRET_KEY,
                code
            }
        };
        const { data } = await axios.post(url, body, options);
        const { data: dataUser } = await axios.get(`https://api.github.com/user`, 
        {
            headers: {
                Authorization: `Bearer ${data.access_token}`,
            },
        });

        if (!dataUser) return null;

        const user = await UserModel.getUserbyOauthID(dataUser.id);

        

        if(user){
            const { contraseña: _, ...publicUser } = user.dataValues

            let cart = await user.getCart();
            if(!cart) cart = await user.createCart();

            return [publicUser, cart]
        }

        const userOptions = {
            correo: dataUser.email,
            oauthID: dataUser.id,
            authMethod: "Github"
        };

        const newUser = await UserModel.createOauthUser(userOptions);

        const { contraseña , ...newPublicUser } = newUser.dataValues;
        let cart = await newUser.createCart()
        
        return [newPublicUser, cart];

    }
}