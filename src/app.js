import express from "express";
import authRoutes from "./app/routes/auth";
import usersRoutes from "./app/routes/User"
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import env from "dotenv";

//organizar o maximo que der
//Falta refatorar database 
//Falta refatorar controller
//Falta refatorar routes 
//criar paginas com ejs certinho

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
        env.config();
    }

    routers() {
        this.server.use("/user", authRoutes);
        this.server.use("/", usersRoutes)
    }

    ejs() {
        this.server.set("view engine", "ejs");
        this.server.use(express.static("public"));
    }

}

export default new App().server; 

