const express = require('express');
const authController = require('../controllers/auth');
const { requireAuth, forwardAuth } = require('../middlewares/auth');
const router = express.Router();

router.get('/register', forwardAuth, (req, res, next) => {
    res.render('register');
});

router.post('/register', authController.register);

router.get('/login', forwardAuth, (req, res, next) => {
    res.render('login');
});

router.post('/login', authController.login);


router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { user: req.user });
});

router.get('/forgot-password', authController.getForgotPassword);
router.put('/forgot-password', authController.forgotPassword);

router.get('/resetpassword/:id', authController.getResetPassword);
router.put('/resetpassword', authController.resetPassword);

router.get('/logout', authController.getLogout);



/*
import { Router } from "express";
import express from "express";
import User from "../controllers/User";
import Session from "../controllers/Session";
import authController from "../middlewares/auth"

const routes = new Router();
//------------//------------ROTAS DAS PÁGINAS DO SITES (GET)--------------//---------------//

//------------//ROTAS DE USUÁRIOS//---------------//
routes.get("/", User.index);//FALTA//PAGINA INICIAL DO BLOG
routes.get("/profile", User.profile);//OK//PAGINA DE PERFIL DE USUARIO

//routes.get("/user/:id", User.users); //FALTA//PAGINA DE UM USUÁRIO
//routes.get("/articles/:id", User.users); //FALTA//PAGINA DE UM ARTIGO
//routes.get("/articles", User.users); //FALTA//PAGINA DE LISTAR TODOS 0S ARTIGOS
//routes.get("/about", User.users);//FALTA //PAGINA SOBRE
//routes.get("/contact", User.users); //FALTA//PAGINA DE CONTATO
//routes.get("/recover", User.users); //FALTA//PAGINA RECUPERAR SENHA


//------------//ROTAS DE ARTIGO//---------------//
//routes.get("/dashboard/articles", User.users); //FALTA//PAGINA DE LISTAR TODOS 0S ARTIGOS PARA ADMIN
//routes.get("/dashboard/articles/new", User.users); //FALTA//PAGINA DE CRIAR 0S ARTIGOS
//routes.get("/dashboard/articles/update", User.users); //FALTA//PAGINA DE ATUALIZAR 0S ARTIGOS
//routes.get("/dashboard/articles/delete", User.users); //FALTA//PAGINA DE DELETAR  0S ARTIGOS


//------------//ROTAS DE ADMIN//---------------//
//mostrar lista de todos os usuário
routes.get("dashboard/users", User.users); //OK//LISTA DE USUÁRIOS PARA ADMIN

//routes.get("/dashboard", User.dashboard);//FALTA//PÁGINA DE ADMINISTRADOR




//------------//------------ROTAS DAS FUNCIONALIDADES(/POST)--------------//---------------//
//------------//ROTAS DE USUÁRIOS//---------------//
//registrar novo usuario
routes.post("/signup", User.create);//OK//ROTA DE LOGIN
//login de usuario
routes.post("/signin", Session.store);//OK//ROTA DE CADASTRO
//atualizar dados de usuario
routes.post("/profile-update", User.update);//OK//ROTA DE UPTADE DE USUARIO
//deletar usuario
routes.post("/profile-delete", User.delete);//ok/ROTA DE DELETAR DE USUARIO


//------------//ROTAS DE ARTIGO//---------------//
//routes.post("/article/find", User.delete);//FALTA//ROTA DE LISTAR ARTIGOS
//routes.post("/article/create", User.delete);//FALTA//ROTA DE CRIAR ARTIGO
//routes.post("/article/update", User.delete);//FALTA//ROTA DE ATUALIZAR ARTIGO
//routes.post("/article/delete", User.delete);//FALTA//ROTA DE DELETAR ARTIGO



//------------//ROTAS DE ADMIN//---------------//
routes.post("/users", User.find); //ROTA DE LISTAR TODOS OS USARIOS PARA ADMIN


*/


export default router;