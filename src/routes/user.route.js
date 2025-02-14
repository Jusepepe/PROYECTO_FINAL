import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifySignIn } from "../middlewares/verifySignIn.js";

export const userRouter = Router();

userRouter.get('/', UserController.getUsers);

userRouter.get('/myCarts', [verifySignIn] , UserController.getUserCarts);
userRouter.get('/myPayments', [verifySignIn] , UserController.getUserPayments);
userRouter.get('/myAccount', [verifySignIn] , UserController.getUserbyID);

userRouter.post('/register', UserController.register);

userRouter.post('/login', UserController.login);

userRouter.post('/logout', [verifySignIn], UserController.logout);