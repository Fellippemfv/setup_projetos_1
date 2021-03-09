import Articles from "../models/Articles"

class ArticlesController{

    async getAllArticles(req, res, next) {
        try{
            res.render("articleAll");
        }catch(error){
            next(error);
        }
    }

    async getOneArticle(req, res, next) {
        try{
            res.render("articleOne");
        }catch(error){
            next(error);
        }
    }

    

}

export default new ArticlesController();