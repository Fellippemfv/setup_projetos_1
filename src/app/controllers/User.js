import User from "../models/Users"
import Article from "../models/Articles";
import Category1 from "../models/Categories1";
import Category2 from "../models/Categories2";
import bcrypt from "bcrypt"

class UserController{

    async getIndex(req, res, next) {
        try{
            let num = 1;
            //Talvez consiga juntar todas as categorias nnuma querie
            const categories1 = await Category1.findAllForView();
            const categories2 = await Category2.findAllForView();
            
            const articles = await Article.findAllPages(num);
            if(articles === undefined){
                res.redirect("/");
            }

            res.render("index", {  
                categories1,
                categories2,
                articles,
                count_articles: num + 1
            });   
           
        }catch(error){
            next(error);
        }
    }

    async getArticlePage(req, res, next) {
        try{

            const num = req.params.num;
            if(isNaN(num)){
                res.redirect("/")
            }

            //juntar toda a consulta numa querie? é preciso mesmo carregar toa hora isso?
            const categories1 = await Category1.findAll();
            const categories2 = await Category2.findAll();
            const num_number = parseInt(num);

            const articles = await Article.findAllPages(num);
            if(articles === undefined){
                res.redirect("/");
            }

            res.render("articlePage", {  
                categories1,
                categories2,
                articles,
                count_articles: num_number + 1
            });   
           
        }catch(error){
            next(error);
        }
    }

    async getOneArticle(req, res, next) {
        try{
            const slug = req.params.slug;
            const categories1 = await Category1.findAllForView();//chamando metodo findall do model
            const categories2 = await Category2.findAllForView();//chamando metodo findall do model
            const article = await Article.findOneArticle(slug); 

            if(article === undefined){
                res.redirect("/");
            }
            res.render("articleOne", {  
                categories1, 
                categories2,
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
                created_at: article.created_at,
                updated_at: article.updated_at,
                cat_title: article.cat_title,
                cat2_title: article.cat2_title,
                us_id: article.user_id,
                us_name: article.us_name,
                us_img: article.us_img

            });   
           
        }catch(error){
            next(error);
        }
    }

    async getOneCategory(req, res, next) {//algo errado/ precisa dar um join
        try{
            const slug = req.params.slug;
            const num = req.params.num;
            if(isNaN(num)){
                res.redirect("/")
            }
            
            const categories1 = await Category1.findAllForView();
            const categories2 = await Category2.findAllForView();
            const num_number = parseInt(num);
            
            const articles = await Article.findAllCategory(slug, num);
            if(articles === undefined){
                res.redirect("/");
            }
            res.render("categoryOne", {  
                categories1,
                categories2,
                articles,
                slug: slug,
                count_articles: num_number + 1
            });   
           
        }catch(error){
            next(error);
        }
    }

    async getOneCategory2(req, res, next) {//algo errado/ precisa dar um join
        try{
            const slug = req.params.slug;
            const num = req.params.num;
            if(isNaN(num)){
                res.redirect("/")
            }

            const categories1 = await Category1.findAllForView();//chamando metodo findall do model
            const categories2 = await Category2.findAllForView();//chamando metodo findall do model
            const num_number = parseInt(num);

            const articles = await Article.findAllCategory2(slug, num); 
            if(articles === undefined){
                res.redirect("/");
            }
            res.render("category2One", {  
                categories1,
                categories2,
                articles,
                slug: slug,
                count_articles: num_number + 1
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
                created_at: user.created_at,
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
            return res.render("userProfile" , { 
                name: user.name,
                photo: user.img_file,
                description: user.description,
                created: user.created_at,
                provider: user.provider

            });
        
            

        }catch(error){
            next(error);
        }
    }
}

export default new UserController();