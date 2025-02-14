import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { verifySignIn } from "../middlewares/verifySignIn.js";

export const paymentRouter = Router();

paymentRouter.get('/', PaymentController.getPaymentsByUser);
paymentRouter.get('/success', [verifySignIn] , PaymentController.createPayment);
paymentRouter.get('/cancel', [verifySignIn] , PaymentController.createPayment);
paymentRouter.get('/start', [verifySignIn] , PaymentController.startPayment);
