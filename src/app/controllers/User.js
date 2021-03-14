import User from "../models/Users"
import bcrypt from "bcrypt"

class UserController{

    async getIndex(req, res, next) {
        try{
            res.render("index");
        }catch(error){
            next(error);
        }
    }

    //async index




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

    //async ProfileUser

    



    
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