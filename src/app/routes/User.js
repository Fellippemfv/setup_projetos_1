import { Router } from "express";
import User from "../controllers/User";
import authUser from "../middlewares/authUser"
import FileController from "../controllers/FileController"
const routes = new Router();


import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

routes.get("/", User.getIndex);//PAGINA INICIAL DO BLOG
routes.get("/articles/page/:num", User.getArticlePage);//PAGINA INICIAL DO BLOG


routes.get("/article/:slug", User.getOneArticle);//PAGINA DE LEITURA DE UM ARTIGO
routes.get("/category/:slug", User.getOneCategory);//PAGINA DE ARTIGOS EM RELAÇÃO A UMA CATEGORIA
routes.get("/category2/:slug", User.getOneCategory2);//PAGINA DE ARTIGOS EM RELAÇÃO A UMA CATEGORIA
routes.get("/category3/:slug", User.getOneCategory3);//PAGINA DE ARTIGOS EM RELAÇÃO A UMA CATEGORIA 


 
//PAGINA DE ARTIGOS POR POR RECENTE (orderby) no index(colocando para infinito estilo facebook)
//Ajeitar view de edição de categoria e view de artigo (mostrando categoria) possivelmente usando innerjoin
//ajeitar visual do css
//testar no site real

routes.get("/profile/:id", User.getProfileUser);//PAGINA DE UM USUÁRIO

routes.get("/myprofile",authUser.requireAuth, User.getMyProfile);//PAGINA DE EDITAR PERFIL DO USUÁRIO
routes.post("/myprofile",authUser.requireAuth, User.myProfile);//PAGINA DE EDITAR PERFIL DO USUÁRIO

routes.post('/files', authUser.requireAuth, upload.single('file'), FileController.store );  //PAGINA DE ENVIAR FOTO DE USUARIO






export default routes;