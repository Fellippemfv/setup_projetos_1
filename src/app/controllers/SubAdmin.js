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
                step1_text: article.step1_text,
                step1_img: article.step1_img,
                step2_text: article.step2_text,
                step2_img: article.step2_img,
                step3_text: article.step3_text,
                step3_img: article.step3_img,
                step4_text: article.step4_text,
                step4_img: article.step4_img,
                step5_text: article.step5_text,
                step5_img: article.step5_img,
                explanation: article.explanation,
                exp_video: article.exp_video,
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
            const {id, title, exp_image_home, description_home, materials, step1_text, step1_img, step2_text, step2_img, step3_text, step3_img, step4_text, step4_img, step5_text, step5_img, explanation, exp_video, tips_important, tips_ead, category_id, category2_id } = req.body;
            const article = await Article.findById(id)

            if(!article) { 
                return res.redirect("/subadmin/dashboard/articles/1");
            }

            await Article.update(id, title, exp_image_home, description_home, materials, step1_text, step1_img, step2_text, step2_img, step3_text, step3_img, step4_text, step4_img, step5_text, step5_img, explanation, exp_video, tips_important, tips_ead, category_id, category2_id);//falta ajeitar update
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
            const { title, exp_image_home, description_home, materials, step1_text, step1_img, step2_text, step2_img, step3_text, step3_img, step4_text, step4_img, step5_text, step5_img, explanation, exp_video, tips_important, tips_ead, category1, category2 } = req.body;
            const user_id = req.user
            const slug = slugify(title)

            if(!title || !description_home || !materials || !tips_important || !tips_ead) {
                res.redirect("/subadmin/dashboard")
            }
            await Article.create(title, slug, exp_image_home, description_home, materials, step1_text, step1_img, step2_text, step2_img, step3_text, step3_img, step4_text, step4_img, step5_text, step5_img, explanation, exp_video, tips_important, tips_ead, category1, category2, user_id )
            res.redirect("/subadmin/dashboard/new/article");
        }catch(error){
            next(error);
        }
    }
    


}

export default new SubAdminController();