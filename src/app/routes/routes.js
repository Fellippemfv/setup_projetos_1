import { Router } from "express";
import express from "express";
import User from "../controllers/User";
import Session from "../controllers/Session";
import authMiddleware from "../middlewares/auth";

const routes = new Router();
//Users
routes.get("/", User.index);//rota: /
routes.get("/users", User.find);

//registrar novo usuario
routes.post("/signup", User.create);//rota: /signup

//login de usuario
routes.post("/sessions", Session.store);//rota: /login

//rotas protegidas
//routes.use(authMiddleware)//Global, a partir daqui vai usar esse middleware
routes.get("/perfil", User.perfil);
routes.put("/users", User.update);//rota: /perfil
routes.delete("/users", User.delete);//rota: /perfildelete


    /*
    .post("/users", User.create)
    .put("/users/:id", User.update)
    .delete("/users/:id", User.delete)
    */
    




export default routes;