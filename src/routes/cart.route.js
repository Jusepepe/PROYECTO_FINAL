import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { verifySignIn } from "../middlewares/verifySignIn.js";

export const cartRouter = Router();

cartRouter.get('/', CartController.getCarts);
cartRouter.get('/myProducts', [verifySignIn] , CartController.getProducts);

cartRouter.patch('/add/:product/:quantity', [verifySignIn] , CartController.addProduct);
cartRouter.patch('/remove/:product', [verifySignIn] , CartController.removeProduct);