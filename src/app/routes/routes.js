import { Router } from "express";
import express from "express";
import User from "../controllers/User";
import Session from "../controllers/Session";
import authMiddleware from "../middlewares/auth";

const routes = new Router();
//Users
routes.get("/", User.index);//rota: /
routes.get("/users", User.find);
routes.post("/users", User.create);//rota: /create

//Sessions
routes.post("/sessions", Session.store);//rota: /login

//rotas protegidas
routes.use(authMiddleware);//Global, a partir daqui vai usar esse middleware
routes.put("/users", User.update);//rota: /myperfil


    /*
    .post("/users", User.create)
    .put("/users/:id", User.update)
    .delete("/users/:id", User.delete)
    */
    




export default routes;