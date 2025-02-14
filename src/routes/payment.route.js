import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";

export const paymentRouter = Router();

paymentRouter.get('/', PaymentController.getPaymentsByUser);
paymentRouter.get('/success', PaymentController.createPayment);
paymentRouter.get('/cancel', PaymentController.createPayment);
paymentRouter.get('/start', PaymentController.startPayment);
