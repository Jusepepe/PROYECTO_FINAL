import jwt from 'jsonwebtoken';

export class Token{

    static createToken(id, correo, cartID){
        const token = jwt.sign({id, correo, cartID}, 
            process.env.JWT_SECRET_TOKEN,
            {
                algorithm: "HS256",
                allowInsecureKeySizes:true,
                expiresIn: 86400
            }
        );
        return token
    }

    static verifyToken(token){
        const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        return data
    }
}