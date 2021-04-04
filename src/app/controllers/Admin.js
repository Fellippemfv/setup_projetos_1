import Admin from "../models/Admin";
import Article from "../models/Articles";
import Category1 from "../models/Categories1";
import Category2 from "../models/Categories2";

import User from "../models/Users";
import slugify from "slugify";

class AdminController{

    async getDashboard(req, res, next) {
        try{
            const id = req.user; 
            const user = await User.findById(id)
            res.render("dashboard" , {
                message: "",
                name: user.name,
                email: user.email,
                photo: user.img_file,

            });

        }catch(error){
            next(error);
        }
    }


/*-------//-----------//-------USUÁRIOS------//------------//---------- */

    async getUsers(req, res, next) {
        try{ 
            const users = await Admin.findAll();//chamando metodo findall do model
            res.render("usersList", {
                users,
            });   
        }catch(error){
            next(error);
        }
    }

    async userSoftdDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const user = await User.findUserById(id)

            if(!user) {
                return res.redirect("/admin/dashboard/users/deleted");
            }

            await Admin.softDelete(id)
            return res.redirect("/admin/dashboard/users/deleted")
        }catch(error){
            next(error);
        }
    }

    async getUsersEdit(req, res, next) {
        try{
            const id = req.params.id;           
            const user = await User.findById(id)
            res.render("usersEdit" , {
                message: "",
                name: user.name,
                email: user.email,
                provider: user.provider,
                id: user.id 

            });
        }catch(error){
            next(error);
        }
    }
 
    async usersEdit(req, res, next) {
        try{
            const {provider, id} = req.body;
            const user = await User.findById(id)

            if(!user) {
                return res.redirect("/admin/dashboard/users");
            }

            await Admin.update(id, provider);
            res.redirect("/admin/dashboard/users")
        }catch(error){
            next(error);
        }
    }
    
    async getUsersDeleted(req, res, next) {
        try{ 
            const users = await Admin.findAllDeleted();//chamando metodo findall do model
            res.render("usersDeleted", {
                users,
            });
        }catch(error){
            next(error);
        }
    } 

    async usersHardDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const user = await User.findUserById(id)

            if(!user) {
                return res.redirect("/admin/dashboard/users/deleted");
            }

            await Admin.hardDelete(id)
            return res.redirect("/admin/dashboard/users/deleted")
        }catch(error){
            next(error);
        }
    }

    async usersBackDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const user = await User.findUserById(id)

            if(!user) {
                return res.redirect("/admin/dashboard/users/deleted");
            }

            await Admin.backDelete(id)
            return res.redirect("/admin/dashboard/users/deleted")
        }catch(error){
            next(error);
        }
    } 

    

    
/*-------//-----------//-------ARTIGOS------//------------//---------- */

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

            res.render("articlesListAdmin", {
                articles,
                count_articles: num_number + 1
            });   
        }catch(error){
            next(error);
        }
    }

    async articleSoftdDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const article = await Article.findById(id);

            if(!article) {
                return res.redirect("/admin/dashboard/articles/deleted");
            }

            await Article.softDelete(id)
            return res.redirect("/admin/dashboard/articles/deleted")
        }catch(error){
            next(error);
        }
    }

    async getArticlesEdit(req, res, next) {
        try{
            const id = req.params.id;           
            const article = await Article.findByIdArticle(id)
           
            const categories1 = await Category1.findAll();//chamando metodo findall do model
            const categories2 = await Category2.findAll();//chamando metodo findall do model

            res.render("articlesEditAdmin" , {
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
            const {id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category_id, category2_id } = req.body;
            const article = await Article.findById(id)

            if(!article) { 
                return res.redirect("/admin/dashboard/articles");
            }

            await Article.update(id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category_id, category2_id);//falta ajeitar update
            res.redirect("/admin/dashboard/articles")
        }catch(error){
            next(error);
        }
    }

    async getArticlesDeleted(req, res, next) {
        try{
            const num = req.params.num;
            if(isNaN(num)){
                res.redirect("/")
            }

            const num_number = parseInt(num); 
            const articles = await Article.findAllDeleted(num);//chamando metodo findall do model
            if(articles === undefined){
                res.redirect("/");
            }
            res.render("articlesDeleted", {
                articles,
                count_articles: num_number + 1
            });
        }catch(error){
            next(error);
        }
    }

    async articlesHardDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const article = await Article.findById(id);

            if(!article) {
                return res.redirect("/admin/dashboard/articles/deleted");
            }

            await Article.hardDelete(id);
            return res.redirect("/admin/dashboard/articles/deleted")
        }catch(error){
            next(error);
        }
    }

    async articlesBackDel(req, res, next) {
        try{ 
            const id = req.params.id;           
            const article = await Article.findById(id);

            if(!article) {
                return res.redirect("/admin/dashboard/articles/deleted");
            }

            await Article.backDelete(id);
            return res.redirect("/admin/dashboard/articles/deleted")
        }catch(error){
            next(error);
        }
    } 


    async getArticlesNew(req, res, next) {
        try{
            const categories1 = await Category1.findAll();//chamando metodo findall do model
            const categories2 = await Category2.findAll();//chamando metodo findall do model
            res.render("articlesNewAdmin", { 
                categories1,
                categories2,
            });
        }catch(error){
            next(error);
        }
    }

    async articlesNew(req, res, next) { 
        try{
            const { title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category1, category2 } = req.body;
            const user_id = req.user
            const slug = slugify(title)

            if(!title || !description_home || !materials || !steps_by_step || !tips_important || !tips_ead) {
                res.redirect("/admin/dashboard")
            }
            await Article.create(title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category1, category2, user_id )
            res.redirect("/admin/dashboard/articles/new");
        }catch(error){
            next(error);
        }
    }


/*-------//-----------//-------CATEGORIAS------//------------//---------- */
    async getCategories(req, res, next) {
        try{
            const num = req.params.num;
            if(isNaN(num)){
                res.redirect("/")
            }

            const num_number = parseInt(num); 
            const categories = await Category1.findAll(num);//chamando metodo findall do model
            if(categories === undefined){
                res.redirect("/");
            }
            res.render("categoriesList", {  
                categories,
                count_articles: num_number + 1
            });   
        }catch(error){
            next(error);
        }
    }

    async getCategoriesEdit(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category1.findById(id)
            res.render("categoriesEdit" , {
                message: "",
                id: category.id,
                title: category.title
            });
        }catch(error){
            next(error);
        }
    }

    async categoriesEdit(req, res, next) {
        try{
            const {id, title} = req.body;
            const category = await Category1.findById(id)

            if(!category) {
                return res.redirect("/admin/dashboard/categories");
            }

            const slug = slugify(title)
            await Category1.update(id, title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead)
            res.redirect("/admin/dashboard/categories")
        }catch(error){
            next(error);
        }
    }

    async getCategoriesNew(req, res, next) {
        try{
            res.render("categoriesNew");
        }catch(error){
            next(error);
        }
    }

    async categoriesNew(req, res, next) {
        try{
            const title = req.body.title;
            if(title === undefined) {
                res.redirect("/admin/dashboard/categories/new")
            }

            const slug = slugify(title)
            await Category1.create(title, slug)

            res.redirect("/admin/dashboard/categories")
        }catch(error){
            next(error);
        }
    }

    async categoriesHardDelete(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category1.findById(id);

            if(!category) {
                return res.redirect("/admin/dashboard/categories");
            }

            await Category.deleteHard(id)
            return res.redirect("/admin/dashboard/categories")
        }catch(error){
            next(error);
        }
    }


/*-------//-----------//-------CATEGORIAS 2------//------------//---------- */
    async getCategories2(req, res, next) {
        try{
            const num = req.params.num;
            if(isNaN(num)){
                res.redirect("/")
            }

            const num_number = parseInt(num); 
            const categories = await Category2.findAll(num);//chamando metodo findall do model
            if(categories === undefined){
                res.redirect("/");
            }
            res.render("categoriesList2", {  
                categories,
                count_articles: num_number + 1
            });   
        }catch(error){
            next(error);
        }
    }

    async getCategoriesEdit2(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category2.findById(id)
            res.render("categoriesEdit2" , {
                message: "",
                id: category.id,
                title: category.title
            });
        }catch(error){
            next(error);
        }
    }

    async categoriesEdit2(req, res, next) {
        try{
            const {id, title} = req.body;
            const category = await Category2.findById(id)

            if(!category) {
                return res.redirect("/admin/dashboard/categories2");
            }

            const slug = slugify(title)
            await Category2.update(id, title, slug)
            res.redirect("/admin/dashboard/categories2")
        }catch(error){
            next(error);
        }
    }

    async getCategoriesNew2(req, res, next) {
        try{
            res.render("categoriesNew2");
        }catch(error){
            next(error);
        }
    }

    async categoriesNew2(req, res, next) {
        try{
            const title = req.body.title;
            if(title === undefined) {
                res.redirect("/admin/dashboard/categories2/new")
            }

            const slug = slugify(title)
            await Category2.create(title, slug)

            res.redirect("/admin/dashboard/categories2")
        }catch(error){
            next(error);
        }
    }

    async categoriesHardDelete2(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category2.findById(id);

            if(!category) {
                return res.redirect("/admin/dashboard/categories2");
            }

            await Category2.deleteHard(id)
            return res.redirect("/admin/dashboard/categories2")
        }catch(error){
            next(error);
        }
    }




}

export default new AdminController();