import { Token } from "../module/token.js";

export function verifyToken(req, res, next){
    const token = req.cookies.access_token;
    req.session = { user : null };
    try{
        const data = Token.verifyToken(token);
        req.session.user = data;
    }catch{}
    next()
}