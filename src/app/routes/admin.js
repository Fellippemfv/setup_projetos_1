import { Router } from "express";
import Admin from "../controllers/Admin";
import authAdmin from "../middlewares/authAdmin"
const routes = new Router();
 
/* -------///-------DASHBOARD------///--------------- */
routes.get("/dashboard",authAdmin.requireAuth, Admin.getDashboard);//PAGINA DE DASHBOARD DE ADMIN DO BLOG

/* -------///-------USUARIOS------///--------------- */ 
routes.get("/dashboard/users",authAdmin.requireAuth, Admin.getUsers);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.get("/dashboard/users/edit/:id",authAdmin.requireAuth, Admin.getUsersEdit);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.post("/dashboard/users/edit/:id",authAdmin.requireAuth, Admin.usersEdit);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.post("/dashboard/users/soft/:id",authAdmin.requireAuth, Admin.userSoftdDel);//PAGINA DE LISTA DE USUÁRIOS DO BLOG

routes.get("/dashboard/users/deleted",authAdmin.requireAuth, Admin.getUsersDeleted);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.post("/dashboard/users/hard/:id",authAdmin.requireAuth, Admin.usersHardDel);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.post("/dashboard/users/back/:id",authAdmin.requireAuth, Admin.usersBackDel);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
 
/* -------///-------ARTIGOS------///--------------- */ 
routes.get("/dashboard/articles",authAdmin.requireAuth, Admin.getArticles);//PAGINA DE LISTA DE ARTIGOS DO BLOG
routes.get("/dashboard/articles/edit/:id",authAdmin.requireAuth, Admin.getArticlesEdit);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.post("/dashboard/articles/edit/:id",authAdmin.requireAuth, Admin.articlesEdit);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.post("/dashboard/articles/soft/:id",authAdmin.requireAuth, Admin.articleSoftdDel);//PAGINA DE LISTA DE USUÁRIOS DO BLOG

routes.get("/dashboard/articles/deleted",authAdmin.requireAuth, Admin.getArticlesDeleted);//PAGINA DE LISTA DE ARTIGOS DO BLOG
routes.post("/dashboard/articles/hard/:id",authAdmin.requireAuth, Admin.articlesHardDel);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
routes.post("/dashboard/articles/back/:id",authAdmin.requireAuth, Admin.articlesBackDel);//PAGINA DE LISTA DE USUÁRIOS DO BLOG
 
routes.get("/dashboard/articles/new",authAdmin.requireAuth, Admin.getArticlesNew);//PAGINA DE CRIAR ARTIGOS DO BLOG
routes.post("/dashboard/articles/new",authAdmin.requireAuth, Admin.articlesNew);//PAGINA DE CRIAR ARTIGOS DO BLOG

/* -------///-------CATEGORIA1------///--------------- */
routes.get("/dashboard/categories",authAdmin.requireAuth, Admin.getCategories);//PAGINA DE LISTA DE CATEGORIAS DO BLOG
routes.get("/dashboard/categories/edit/:id",authAdmin.requireAuth, Admin.getCategoriesEdit);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.post("/dashboard/categories/edit/:id",authAdmin.requireAuth, Admin.categoriesEdit);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.post("/dashboard/categories/del/:id",authAdmin.requireAuth, Admin.categoriesHardDelete);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.get("/dashboard/categories/new",authAdmin.requireAuth, Admin.getCategoriesNew);//PAGINA DE CRIAR CATEGORIAS DO BLOG
routes.post("/dashboard/categories/new",authAdmin.requireAuth, Admin.categoriesNew);//PAGINA DE CRIAR CATEGORIAS DO BLOG

/* -------///-------CATEGORIA2------///--------------- */
routes.get("/dashboard/categories2",authAdmin.requireAuth, Admin.getCategories2);//PAGINA DE LISTA DE CATEGORIAS DO BLOG
routes.get("/dashboard/categories2/edit/:id",authAdmin.requireAuth, Admin.getCategoriesEdit2);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.post("/dashboard/categories2/edit/:id",authAdmin.requireAuth, Admin.categoriesEdit2);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.post("/dashboard/categories2/del/:id",authAdmin.requireAuth, Admin.categoriesHardDelete2);//PAGINA DE EDITAR CATEGORIAS DO BLOG
routes.get("/dashboard/categories2/new",authAdmin.requireAuth, Admin.getCategoriesNew2);//PAGINA DE CRIAR CATEGORIAS DO BLOG
routes.post("/dashboard/categories2/new",authAdmin.requireAuth, Admin.categoriesNew2);//PAGINA DE CRIAR CATEGORIAS DO BLOG



export default routes;