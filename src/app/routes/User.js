import express from "express";
import User from "../controllers/User";
import { Router } from "express";
const routes = new Router();


routes.get("/", User.index);//PAGINA INICIAL DO BLOG
routes.get("/users", User.users);//PAGINA DE UM USUÁRIO



export default routes;