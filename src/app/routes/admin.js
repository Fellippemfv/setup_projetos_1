import express from "express";
import User from "../controllers/User";
import { Router } from "express";
const routes = new Router();
import authAdmin from "../middlewares/authAdmin"


/* 
routes.get("/", User.index);//PAGINA INICIAL DO BLOG
routes.get("/users", User.users);//PAGINA DE UM USUÁRIO
routes.get("/myprofile",authUser.requireAuth, User.profile);//PAGINA DE UM USUÁRIO
*/



export default routes;