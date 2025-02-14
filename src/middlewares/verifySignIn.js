export function verifySignIn(req, res, next){
    if(!req.session.user){
        return res.json({ message: "No está logeado"})
    }
    next()
}