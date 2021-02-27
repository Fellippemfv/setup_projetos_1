import { Router } from "express";
import express from "express";
import User from "../controllers/User";
import Session from "../controllers/Session";
import authMiddleware from "../middlewares/auth";

const routes = new Router();
//------------//------------ROTAS DAS PÁGINAS DO SITES--------------//---------------//
//------------//ROTAS DE USUÁRIOS//---------------//
//pagina index/inicial
routes.get("/", User.index);//rota: //FALTA
//pagina de perfil usuario
routes.get("/profile", User.profile);//OK

//------------//ROTAS DE ADMIN//---------------//
//mostrar lista de todos os usuário
routes.get("/users", User.users); //FALTA-------


//pagina de adiministrador
//routes.get("/dashboard", User.dashboard);//falta
//pagina de criar artigo
//routes.get("/dashboard/article", User.dashboard);//falta



//------------//------------ROTAS DAS FUNCIONALIDADES(GET/POST)--------------//---------------//

//------------//ROTAS DE USUÁRIOS//---------------//
//registrar novo usuario
routes.post("/signup", User.create);//OK
//login de usuario
routes.post("/signin", Session.store);//OK
//atualizar dados de usuario
routes.post("/profile-update", User.update);//OK
//deletar usuario
routes.post("/profile-delete", User.delete);//ok

//------------//ROTAS DE ADMIN//---------------//
routes.post("/users", User.find); //ok



export default routes;