import Admin from "../models/Admin";
import Article from "../models/Articles";
import Category from "../models/Categories";
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

    
/*-------//-----------//-------ARTIGOS------//------------//---------- */

    async getArticles(req, res, next) {
        try{
            res.render("articlesListAdmin");
        }catch(error){
            next(error);
        }
    }

    async getArticlesDeleted(req, res, next) {
        try{
            res.render("articlesDeleted");
        }catch(error){
            next(error);
        }
    }

    async getArticlesEdit(req, res, next) {
        try{
            res.render("articlesEditAdmin");
        }catch(error){
            next(error);
        }
    }

    async getArticlesNew(req, res, next) {
        try{
            res.render("articlesNewAdmin");
        }catch(error){
            next(error);
        }
    }


/*-------//-----------//-------CATEGORIAS------//------------//---------- */
    async getCategories(req, res, next) {
        try{
            const categories = await Category.findAll();//chamando metodo findall do model
            res.render("categoriesList", {  
                categories,
            });   
        }catch(error){
            next(error);
        }
    }

    async getCategoriesEdit(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category.findById(id)
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
            const category = await Category.findById(id)

            if(!category) {
                return res.redirect("/admin/dashboard/categories");
            }

            await Category.update(id, title)
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
            await Category.create(title, slug)

            res.redirect("/admin/dashboard/categories")
        }catch(error){
            next(error);
        }
    }

    async categoriesHardDelete(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category.findById(id);

            if(!category) {
                return res.redirect("/admin/dashboard/categories");
            }

            await Category.deleteHard(id)
            return res.redirect("/admin/dashboard/categories")
        }catch(error){
            next(error);
        }
    }


}

export default new AdminController();