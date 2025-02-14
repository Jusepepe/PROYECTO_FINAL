import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { paymentRouter } from "../routes/payment.route.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { oauthRouter } from "../routes/oauth.route.js";
import { userRouter } from "../routes/user.route.js";
import { cartRouter } from "../routes/cart.route.js";
import { productRouter } from "../routes/product.route.js";

export class Server{
    constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors({
            origin: (origin, callback) => {
                callback(null, true); // ✅ Permitir todo
            }, // Cambia esto por el origen de tu frontend
            credentials: true // Permite enviar cookies
        }));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(verifyToken);
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.json( {message:"Hello World!"} );
        })
        this.app.use('/payments', paymentRouter);
        this.app.use('/oauth', oauthRouter);
        this.app.use('/user', userRouter);
        this.app.use('/cart', cartRouter);
        this.app.use('/product', productRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listening on port http://localhost:${this.port}`);
        })
    }
}