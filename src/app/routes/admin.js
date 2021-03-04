import { Router } from "express";
import Admin from "../controllers/Admin";
import authAdmin from "../middlewares/authAdmin"
const routes = new Router();


routes.get("/dashboard",authAdmin.requireAuth, Admin.getDashboard);//PAGINA DE DASHBOARD DE ADMIN DO BLOG
routes.get("/dashboard/users",authAdmin.requireAuth, Admin.getUsers);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.get("/dashboard/articles",authAdmin.requireAuth, Admin.getArticles);//PAGINA DE LISTA DE ARTIGOS DO BLOG
routes.get("/dashboard/articles/edit",authAdmin.requireAuth, Admin.getArticlesEdit);//PAGINA DE EDITAR ARTIGOS DO BLOG
routes.get("/dashboard/articles/new",authAdmin.requireAuth, Admin.getArticlesNew);//PAGINA DE CRIAR ARTIGOS DO BLOG
routes.get("/dashboard/categories",authAdmin.requireAuth, Admin.getCategories);//PAGINA DE LISTA DE CATEGORIAS DO BLOG
routes.get("/dashboard/categories/edit",authAdmin.requireAuth, Admin.getCategoriesEdit);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.get("/dashboard/categories/new",authAdmin.requireAuth, Admin.getCategoriesNew);//PAGINA DE CRIAR CATEGORIAS DO BLOG


export default routes;