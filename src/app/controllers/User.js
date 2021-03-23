import User from "../models/Users"
import Article from "../models/Articles";
import Category from "../models/Categories";
import Category2 from "../models/Categories2";
import Category3 from "../models/Categories3";
import bcrypt from "bcrypt"

class UserController{

    async getIndex(req, res, next) {
        try{
            const categories = await Category.findAll();//chamando metodo findall do model
            const categories2 = await Category2.findAll();//chamando metodo findall do model
            const categories3 = await Category3.findAll();//chamando metodo findall do model
            const articles = await Article.findAll();
            res.render("index", {  
                categories,
                categories2,
                categories3,
                articles
            });   
           
        }catch(error){
            next(error);
        }
    }

    async getOneArticle(req, res, next) {
        try{
            const slug = req.params.slug;
            const categories = await Category.findAll();//chamando metodo findall do model
            const categories2 = await Category2.findAll();//chamando metodo findall do model
            const categories3 = await Category3.findAll();//chamando metodo findall do model
            const article = await Article.findOne(slug)
            console.log(article)

            if(article === undefined){
                res.redirect("/");
            }
            res.render("articleOne", {  
                categories,
                categories2,
                categories3,
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
                created_at: article.created_at,
                updated_at: article.updated_at,

            });   
           
        }catch(error){
            next(error);
        }
    }

    


    async getMyProfile(req, res, next) {
        try{
            const id = req.user;
            const user = await User.findById(id)
            res.render("myProfile" , {
                message: "",
                name: user.name,
                email: user.email,
                updated_at: user.updated_at,
                photo: user.img_file,
                description: user.description

            });
        }catch(error){
            next(error);
        }
    }

    async myProfile(req, res, next) {

        try {
            const { description, email, oldPassword, password, name, deleted } = req.body;
            const id = req.user
            const user = await User.findById(id)
//------------//-----------------///---------------- validando email//------------//-----------------///----------------
            if(email) {
                        if(email === user.email) {//validação1 se o email dele é diferente do banco
                            return res.render('myProfile', {
                                message: 'Este email é o mesmo que o antigo',
                                name: user.name,
                                email: user.email,
                                updated_at: user.updated_at,
                                photo: user.img_file,
                                description: user.description
                            });
                        }
    
                        const userExist = await User.findOneEmail(email);
                        if (userExist === true) {//validação2 de email valido
                            return res.render('myProfile', {
                                message: 'alguem já cadastrou este email',
                                name: user.name,
                                email: user.email,
                                updated_at: user.updated_at,
                                photo: user.img_file,
                                description: user.description
                            });
                        }
    
            }
//------------//-----------------///----------------comparando senha//------------//-----------------///----------------
            if(password) {
                        const passwordExist = await User.findHashById(id);//validação1 de senha, se confere a senha antiga com o banco
                        if(oldPassword && !(await bcrypt.compare(oldPassword, passwordExist.password_hash))) {
                            return res.render('myProfile', {
                                message: 'Senha atual não confere',
                                name: user.name,
                                email: user.email,
                                updated_at: user.updated_at,
                                photo: user.img_file,
                                description: user.description
                            });                    
                        }
            }
                    
            await User.update(description, id, name, email, password, deleted);
                res.render("myProfile" , {
                    message: "Dados atualizados com sucesso!",
                    name: user.name,
                    email: user.email,
                    updated_at: user.updated_at,
                    photo: user.img_file,
                    description: user.description
                });
                    
        } catch (error) {
            next(error)
        }
    }

    async getProfileUser(req, res, next) {
        try{
            const id = req.params.id;           
            const user = await User.findUserById(id)

            if(!user) {
                return res.redirect("/");
            }
            return res.render("user" , { 
                name: user.name,
                photo: user.img_file,
                description: user.description

            });
        
            

        }catch(error){
            next(error);
        }
    }

    async ProfileUser(req, res, next) {

        try {
            const id = req.header;
            const user = await User.findById(id)
            console.log(user)

                    
        } catch (error) {
            next(error)
        }
    }


    async find(req, res, next) {
        try{
            let users = await User.findAll();
            res.json(users);
        }catch(error){
            next(error);
        }
    }

}

export default new UserController();