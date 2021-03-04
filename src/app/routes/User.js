import { Router } from "express";
import User from "../controllers/User";
import authUser from "../middlewares/authUser"
const routes = new Router();


routes.get("/", User.getIndex);//PAGINA INICIAL DO BLOG
routes.get("/user/:nome", User.getUser);//PAGINA DE UM USUÁRIO
routes.get("/myprofile",authUser.requireAuth, User.getProfile);//PAGINA DE EDITAR PERFIL DO USUÁRIO


export default routes;