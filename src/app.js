import express from "express";
import authRoutes from "./app/routes/auth";
import usersRoutes from "./app/routes/User"
import adminRoutes from "./app/routes/admin"
import articlesRouts from "./app/routes/Articles"
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import env from "dotenv";
env.config();

//Falta refatorar database 
//ver o que ta errado com css das partials do ejs 
/* paginas ---------------
-forgot password
-reset password
*/
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
        this.server.use("/admin", adminRoutes)
        this.server.use("/user", authRoutes);
        this.server.use("/articles", articlesRouts);
        this.server.use("/", usersRoutes)
    }

    ejs() {
        this.server.set("view engine", "ejs");
        this.server.use(express.static("public"));
    }

}

export default new App().server; 

