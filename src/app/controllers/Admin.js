import Admin from "../models/Admin"

class AdminController{

    async getDashboard(req, res, next) {
        try{
            res.render('dashboard', { user: req.user });
        }catch(error){
            next(error);
        }
    }

    async getProfile(req, res, next) {
        try{
            res.render("users/profile");
        }catch(error){
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try{ 
            const users = await Admin.findAll();//chamando metodo findall do model
            res.render("users", {
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

    async getArticles(req, res, next) {
        try{
            res.render("articles");
        }catch(error){
            next(error);
        }
    }

    async getArticlesEdit(req, res, next) {
        try{
            res.render("articlesEdit");
        }catch(error){
            next(error);
        }
    }

    async getArticlesNew(req, res, next) {
        try{
            res.render("articlesNew");
        }catch(error){
            next(error);
        }
    }

    async getCategories(req, res, next) {
        try{
            res.render("categories");
        }catch(error){
            next(error);
        }
    }

    async getCategoriesEdit(req, res, next) {
        try{
            res.render("categoriesEdit");
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


}

export default new AdminController();