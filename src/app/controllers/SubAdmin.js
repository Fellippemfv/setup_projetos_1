import Admin from "../models/Admin";
import Article from "../models/Articles";
import Category1 from "../models/Categories1";
import Category2 from "../models/Categories2";
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
            const num = req.params.num;
            if(isNaN(num)){
                res.redirect("/")
            }

            const num_number = parseInt(num);
            const articles = await Article.findAll(num);//chamando metodo findall do model
            if(articles === undefined){
                res.redirect("/");
            }
            res.render("articlesListSubadmin", {
                articles,
                count_articles: num_number + 1
            });   
        }catch(error){
            next(error);
        }
    }

    async getArticlesEdit(req, res, next) {
        try{
            const id = req.params.id;  
            const article = await Article.findByIdArticle(id)

            const categories1 = await Category1.findAllForView();//chamando metodo findall do model
            const categories2 = await Category2.findAllForView();//chamando metodo findall do model

            res.render("articlesEditSubAdmin" , { 
                message: "", 
                id: article.id,
                title: article.title,
                exp_image_home: article.exp_image_home,
                description_home: article.description_home,
                materials: article.materials,
                steps_by_step: article.steps_by_step,
                explanation: article.explanation,
                exp_video: article.exp_video,
                exp_image_initial: article.exp_image_initial,
                exp_image_done: article.exp_image_done,
                tips_important: article.tips_important,
                tips_ead: article.tips_ead,
                updated_at: article.updated_at,
                categories1: categories1,
                cat_title: article.cat_title,
                categories2: categories2,
                cat2_title: article.cat2_title,
            });
        }catch(error){
            next(error);
        }
    }

    async articlesEdit(req, res, next) {
        try{ 
            const {id, title, exp_image_home, description_home, materials, steps_by_step, explanation, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category_id, category2_id } = req.body;
            const article = await Article.findById(id)

            if(!article) { 
                return res.redirect("/subadmin/dashboard/articles/1");
            }

            await Article.update(id, title, exp_image_home, description_home, materials, steps_by_step, explanation, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category_id, category2_id);
            res.redirect("/subadmin/dashboard/articles/1")
        }catch(error){
            next(error);
        }
    }

    async articleSoftdDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const article = await Article.findById(id);

            if(!article) {
                return res.redirect("/subadmin/dashboard/articles/1");
            }

            await Article.softDelete(id)
            return res.redirect("/subadmin/dashboard/articles/1")
        }catch(error){
            next(error);
        }
    }

    async getArticlesNew(req, res, next) {
        try{ 
            const categories1 = await Category1.findAllForView();//chamando metodo findall do model
            const categories2 = await Category2.findAllForView();//chamando metodo findall do model
            res.render("articlesNewSubadmin", {
                categories1,
                categories2
            });
        }catch(error){
            next(error);
        }
    }

    async articlesNew(req, res, next) {
        try{
            const { title, exp_image_home, description_home, materials, steps_by_step, explanation, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category1, category2 } = req.body;
            const user_id = req.user
            const slug = slugify(title)

            if(!title || !description_home || !materials || !steps_by_step || !tips_important || !tips_ead) {
                res.redirect("/subadmin/dashboard")
            }
            await Article.create(title, slug, exp_image_home, description_home, materials, steps_by_step, explanation, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category1, category2, user_id )
            res.redirect("/subadmin/dashboard/new/article");
        }catch(error){
            next(error);
        }
    }
    


}

export default new SubAdminController();