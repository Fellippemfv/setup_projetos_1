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

//Falta ver os arquivos de foto ao criar/editar arigo

//Falta refatorar database 
//Falta ver sistema de email

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

