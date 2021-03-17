import { Router } from "express";
import SubAdmin from "../controllers/SubAdmin";
import authSubAdmin from "../middlewares/authSubAdmin"
const routes = new Router();
 

routes.get("/dashboard",authSubAdmin.requireAuth, SubAdmin.getDashboard);//PAGINA DE DASHBOARD DE ADMIN DO BLOG
routes.get("/dashboard/articles",authSubAdmin.requireAuth, SubAdmin.getArticles);//PAGINA DE LISTA DE ARTIGOS DO BLOG
routes.get("/dashboard/articles/new",authSubAdmin.requireAuth, SubAdmin.getArticlesNew);//PAGINA DE CRIAR ARTIGOS DO BLOG

/*
routes.get("/dashboard/articles/deleted",authSubAdmin.requireAuth, Admin.getArticlesDeleted);//PAGINA DE LISTA DE ARTIGOS DO BLOG
routes.get("/dashboard/articles/edit",authSubAdmin.requireAuth, Admin.getArticlesEdit);//PAGINA DE EDITAR ARTIGOS DO BLOG
*/


export default routes;