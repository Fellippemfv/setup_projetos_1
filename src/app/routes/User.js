import { Router } from "express";
import User from "../controllers/User";
import authUser from "../middlewares/authUser"
const routes = new Router();


routes.get("/", User.index);//PAGINA INICIAL DO BLOG
routes.get("/user/:nome", User.user);//PAGINA DE UM USUÁRIO
routes.get("/myprofile",authUser.requireAuth, User.profile);//PAGINA DE EDITAR PERFIL DO USUÁRIO


export default routes;