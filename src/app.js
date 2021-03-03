import express from "express";
import routes from "./app/routes/routes";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import env from "dotenv";
import mysql from "mysql2";


class App {
    constructor() {
        //chama o servidor
        this.server = express();

        //chamar os metodos criados logo abaixo
        this.middlewares();
        this.routes();

        //chamar ViewEngine
        this.ejs();

        //Chamar DB
        this.database();

    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cookieParser());
        this.server.use(methodOverride('_method'));
        this.server.use(cors());
        env.config();
    }

    routes() {
        
        this.server.use("/user", routes);
    }

    ejs() {
        this.server.set("view engine", "ejs");
        this.server.use(express.static("public"));
    }

    database() {
        const db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'knex_test'
        });
        
        db.connect((err) => {
            if (err)
                throw err;
            else
                console.log("Mysql Connected")
        });
    }

}

export default new App().server; 

