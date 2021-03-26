import Admin from "../models/Admin";
import Article from "../models/Articles";
import Category from "../models/Categories";
import Category2 from "../models/Categories2";
import Category3 from "../models/Categories3";
import User from "../models/Users";
import slugify from "slugify";


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
            const articles = await Article.findAll();//chamando metodo findall do model
            res.render("articlesListSubadmin", {
                articles,
            });   
        }catch(error){
            next(error);
        }
    }

    async getArticlesEdit(req, res, next) {
        try{
            const id = req.params.id;           
            const article = await Article.findById(id)
            const categories = await Category.findAll();//chamando metodo findall do model
            const categories2 = await Category2.findAll();//chamando metodo findall do model
            const categories3 = await Category3.findAll();//chamando metodo findall do model
            res.render("articlesEditSubadmin" , {
                message: "",
                id: article.id,
                title: article.title,
                exp_image_home: article.exp_image_home,
                description_home: article.description_home,
                materials: article.materials,
                steps_by_step: article.steps_by_step,
                exp_video: article.exp_video,
                exp_image_initial: article.exp_image_initial,
                exp_image_done: article.exp_image_done,
                tips_important: article.tips_important,
                tips_ead: article.tips_ead,
                updated_at: article.updated_at,
                categories: categories,
                categories2: categories2,
                categories3: categories3

            });
        }catch(error){
            next(error);
        }
    }

    async articlesEdit(req, res, next) {
        try{ 
            const {id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead} = req.body;
            const article = await Article.findById(id)

            if(!article) { 
                return res.redirect("/subadmin/dashboard/articles");
            }

            await Article.update(id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead);//falta ajeitar update
            res.redirect("/subadmin/dashboard/articles")
        }catch(error){
            next(error);
        }
    }

    async articleSoftdDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const article = await Article.findById(id);

            if(!article) {
                return res.redirect("/subadmin/dashboard/articles");
            }

            await Article.softDelete(id)
            return res.redirect("/subadmin/dashboard/articles")
        }catch(error){
            next(error);
        }
    }


    async getArticlesNew(req, res, next) {
        try{
            const categories = await Category.findAll();//chamando metodo findall do model
            const categories2 = await Category2.findAll();//chamando metodo findall do model
            const categories3 = await Category3.findAll();//chamando metodo findall do model
            res.render("articlesNewSubadmin", {
                categories,
                categories2,
                categories3
            });
        }catch(error){
            next(error);
        }
    }

    async articlesNew(req, res, next) {
        try{
            const { title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead } = req.body;
            const slug = slugify(title)

            if(!title || !description_home || !materials || !steps_by_step || !tips_important || !tips_ead) {
                res.redirect("/subadmin/dashboard")
            }
            await Article.create(title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead)
            res.redirect("/subadmin/dashboard/articles/new");
        }catch(error){
            next(error);
        }
    }
    


}

export default new SubAdminController();