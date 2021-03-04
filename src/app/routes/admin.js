import { Router } from "express";
import Admin from "../controllers/Admin";
import authAdmin from "../middlewares/authAdmin"
const routes = new Router();


routes.get("/dashboard",authAdmin.requireAuth, Admin.dashboard);//PAGINA DE DASHBOARD DE ADMIN DO BLOG
routes.get("/dashboard/users",authAdmin.requireAuth, Admin.users);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.get("/dashboard/articles",authAdmin.requireAuth, Admin.articles);//PAGINA DE LISTA DE ARTIGOS DO BLOG
routes.get("/dashboard/articles/edit",authAdmin.requireAuth, Admin.articlesEdit);//PAGINA DE EDITAR ARTIGOS DO BLOG
routes.get("/dashboard/articles/new",authAdmin.requireAuth, Admin.articlesNew);//PAGINA DE CRIAR ARTIGOS DO BLOG
routes.get("/dashboard/categories",authAdmin.requireAuth, Admin.categories);//PAGINA DE LISTA DE CATEGORIAS DO BLOG
routes.get("/dashboard/categories/edit",authAdmin.requireAuth, Admin.categoriesEdit);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.get("/dashboard/categories/new",authAdmin.requireAuth, Admin.categoriesNew);//PAGINA DE CRIAR CATEGORIAS DO BLOG


export default routes;