import Admin from "../models/Admin";
import Article from "../models/Articles";
import Category from "../models/Categories";
import Category2 from "../models/Categories2";
import Category3 from "../models/Categories3";

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

            const slug = slugify(title)
            await Category.update(id, title, slug)
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


/*-------//-----------//-------CATEGORIAS 2------//------------//---------- */
    async getCategories2(req, res, next) {
        try{
            const categories = await Category2.findAll();//chamando metodo findall do model
            res.render("categoriesList2", {  
                categories,
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


/*-------//-----------//-------CATEGORIAS 3------//------------//---------- */
    async getCategories3(req, res, next) {
        try{
            const categories = await Category3.findAll();//chamando metodo findall do model
            res.render("categoriesList3", {  
                categories,
            });   
        }catch(error){
            next(error);
        }
    }

    async getCategoriesEdit3(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category3.findById(id)
            res.render("categoriesEdit3" , {
                message: "",
                id: category.id,
                title: category.title
            });
        }catch(error){
            next(error);
        }
    }

    async categoriesEdit3(req, res, next) {
        try{
            const {id, title} = req.body;
            const category = await Category3.findById(id)

            if(!category) {
                return res.redirect("/admin/dashboard/categories3");
            }

            const slug = slugify(title)
            await Category3.update(id, title, slug)
            res.redirect("/admin/dashboard/categories3")
        }catch(error){
            next(error);
        }
    }

    async getCategoriesNew3(req, res, next) {
        try{
            res.render("categoriesNew3");
        }catch(error){
            next(error);
        }
    }

    async categoriesNew3(req, res, next) {
        try{
            const title = req.body.title;
            if(title === undefined) {
                res.redirect("/admin/dashboard/categories3/new")
            }

            const slug = slugify(title)
            await Category3.create(title, slug)

            res.redirect("/admin/dashboard/categories3")
        }catch(error){
            next(error);
        }
    }

    async categoriesHardDelete3(req, res, next) {
        try{
            const id = req.params.id;           
            const category = await Category3.findById(id);

            if(!category) {
                return res.redirect("/admin/dashboard/categories3");
            }

            await Category3.deleteHard(id)
            return res.redirect("/admin/dashboard/categories3")
        }catch(error){
            next(error);
        }
    }


}

export default new AdminController();