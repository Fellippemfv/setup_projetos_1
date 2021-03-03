import express from "express";
import routes from "./app/routes/routes";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";


class App {
    constructor() {
        //chama o servidor
        this.server = express();

        //chamar os metodos criados logo abaixo
        this.middlewares();
        this.routes();

        //chamar EJS
        this.ejs();

    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cookieParser());
        this.server.use(methodOverride('_method'));
        this.server.use(cors());



    }

    routes() {
        this.server.use(routes);
    }

    ejs() {
        this.server.set("view engine", "ejs");
        this.server.use(express.static("public"));
    }

}

export default new App().server; 

