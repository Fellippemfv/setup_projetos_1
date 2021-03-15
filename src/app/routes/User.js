import { Router } from "express";
import User from "../controllers/User";
import authUser from "../middlewares/authUser"
import FileController from "../controllers/FileController"
const routes = new Router();


import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

routes.get("/", User.getIndex);//PAGINA INICIAL DO BLOG
//PAGINA DE ARTIGOS POR CATEGORIA
//PAGINA DE ARTIGOS POR POR RECENTE

routes.get("/profile/:id", User.getProfileUser);//PAGINA DE UM USUÁRIO

routes.get("/myprofile",authUser.requireAuth, User.getMyProfile);//PAGINA DE EDITAR PERFIL DO USUÁRIO
routes.post("/myprofile",authUser.requireAuth, User.myProfile);//PAGINA DE EDITAR PERFIL DO USUÁRIO

routes.post('/files', authUser.requireAuth, upload.single('file'), FileController.store );  //PAGINA DE ENVIAR FOTO DE USUARIO






export default routes;