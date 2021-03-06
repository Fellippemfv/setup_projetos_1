import express from "express";
import authRoutes from "./app/routes/auth";
import usersRoutes from "./app/routes/User";
import adminRoutes from "./app/routes/admin";
import subAdminRoutes from "./app/routes/subAdmin";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import env from "dotenv";
import path from "path";
import { localsName } from "ejs";
env.config();  

//Falta ver rolamento infinito de view de user do--> ok
//Falta ver rolamento infinito de artigos/users/categorys do admin --> ok
//Falta ver rolamento infinito de artigos do subadmin --> ok
//Falta adicionar "Explicação" ao new admin e subadmin --> ok
//Falta adcionar 5 campos para passo a passo, onde ele deve aceitar valores null... ou seja a 
//pessoa terá até 5 passo a passo com uma imagem representando ela --> ok
//Falta tirar descrição e colocar a foto principal do experimento --> ok
//Falta ver validações do usuario --> ok 
//Falta ajeitar view da lista de usuarios/deletados --> ok
//Falta ver bugs visuais na listagem e algumas paginas --> ok
//Falta atualizar navbar de subadmin e admin com orientações --> ok
//Falta ver a pagina de artigo --> ok
//Falta passar todas as paginas para a view mobile (celular) --> ok
//Falta ver visual: css --> falta index/listas 
// bugs na istagemm de artigos
// Ver os nome dos arquivos ejs --> ok
//Falta ver , logo, cor de fundo do menu , e mobile
// ver os nomes dos arquivos css
//refatorar css ao minimo que der
//Falta testar num site real 
//Falta refatorar database 
//Falta ver sistema de email
//Falta ver detalhes de tudo e descobrir bugs

class App { 
    constructor() { 
        //chama o servidor
        this.server = express();

        //chamar os metodos criados logo abaixo
        this.middlewares();
        this.routers();

        //chamar ViewEngine
        this.ejs();

    }
 
    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cookieParser());
        this.server.use(methodOverride('_method'));
        this.server.use(cors());
    }

    routers() {
        this.server.use(function (req, res, next) {
            res.locals.isAuthenticated = req.cookies.jwt;
            next();
        })
        this.server.use("/admin", adminRoutes)
        this.server.use("/subadmin", subAdminRoutes)
        this.server.use("/", authRoutes);
        this.server.use("/", usersRoutes)  
        
    }

    ejs() {
        this.server.set("view engine", "ejs");
        this.server.use(express.static("public"));
        this.server.use("/files", express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));


    }

}

export default new App().server; 

