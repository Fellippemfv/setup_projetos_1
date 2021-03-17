import Admin from "../models/Admin";
import Article from "../models/Articles";
import Category from "../models/Categories";
import User from "../models/Users";

class SubAdminController{

    async getDashboard(req, res, next) {
        try{
            const id = req.user; 
            const user = await User.findById(id)
            res.render("dashboardAlt" , {
                message: "",
                name: user.name,
                email: user.email,
                photo: user.img_file,

            });

        }catch(error){
            next(error);
        }
    }

    async getArticles(req, res, next) {
        try{
            res.render("articlesListSubadmin");
        }catch(error){
            next(error);
        }
    }

    async getArticlesNew(req, res, next) {
        try{
            res.render("articlesNewSubadmin");
        }catch(error){
            next(error);
        }
    }


}

export default new SubAdminController();