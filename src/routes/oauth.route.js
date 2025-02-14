import { Router } from "express";
import { OauthController } from "../controllers/oauth.controller.js";

export const oauthRouter = Router();

oauthRouter.get('/github/login', OauthController.githubOauth)

oauthRouter.get('/github/callback', OauthController.githubCallback)

oauthRouter.get('/github/test', OauthController.githubCallback)