import { Router } from "express";
import User from "../controllers/User";
import authUser from "../middlewares/authUser"
const routes = new Router();


routes.get("/", User.getIndex);//PAGINA INICIAL DO BLOG

routes.get("/user/:id", User.getProfileUser);//PAGINA DE UM USUÁRIO//falta
//routes.post("/user/:id", User.getProfileUser);//PAGINA DE UM USUÁRIO//falta

routes.get("/myprofile",authUser.requireAuth, User.getMyProfile);//PAGINA DE EDITAR PERFIL DO USUÁRIO
routes.post("/myprofile",authUser.requireAuth, User.myProfile);//PAGINA DE EDITAR PERFIL DO USUÁRIO



export default routes;