import { Router } from "express";
import Articles from "../controllers/articles";
const routes = new Router();


routes.get("/all", Articles.getAllArticles);//PAGINA INICIAL DO BLOG
routes.get("/one", Articles.getOneArticle);//PAGINA INICIAL DO BLOG



export default routes;