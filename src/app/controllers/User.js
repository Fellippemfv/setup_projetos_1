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
                updated_at: user.updated_at
            });
        }catch(error){
            next(error);
        }
    }

    async myProfile(req, res, next) {

        try {
            const { email, oldPassword, password, name, deleted } = req.body;
            const id = req.user
            const user = await User.findById(id)
//------------//-----------------///---------------- validando email//------------//-----------------///----------------
            if(email) {
                        if(email === user.email) {//validação1 se o email dele é diferente do banco
                            return res.render('myProfile', {
                                message: 'Este email é o mesmo que o antigo',
                                name: user.name,
                                email: user.email,
                                updated_at: user.updated_at
                            });
                        }
    
                        const userExist = await User.findOneEmail(email);
                        if (userExist === true) {//validação2 de email valido
                            return res.render('myProfile', {
                                message: 'alguem já cadastrou este email',
                                name: user.name,
                                email: user.email,
                                updated_at: user.updated_at
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
                                updated_at: user.updated_at
                            });                    
                        }
            }
                    
            await User.update(id, name, email, password, deleted);
                res.render("myProfile" , {
                    message: "Dados atualizados com sucesso!",
                    name: user.name,
                    email: user.email,
                    updated_at: user.updated_at
                });
                    
        } catch (error) {
            next(error)
        }
    }

    async getUser(req, res, next) {
        try{
            res.render("user");
        }catch(error){
            next(error);
        }
    }

    //async user



    
    async find(req, res, next) {
        try{
            let users = await User.findAll();
            res.json(users);
        }catch(error){
            next(error);
        }
    }

    async create(req, res, next) {
          try{
//------------//-----------------///---------------- validação de email//------------//-----------------///----------------
            const { name, email, password } = req.body;
            const provider = 0
            const userExist = await User.findOneEmail(email);
            if (userExist) {//validação2 de email
                return res.status(400).json({ error: "User already exists." })
            }
//------------//-----------------///---------------- create//------------//-----------------///----------------
            const user = await User.create(name, email, password, provider)
            return res.status(201).json({name, email, provider})
          }catch(error){
            next(error)
          }
    }

    async update(req, res, next) {
//------------//-----------------///---------------- validando email//------------//-----------------///----------------
        try {
            const { email, oldPassword, password, name } = req.body;
            const id = req.userId
            const user = await User.findById(id)
            if(email && email != user.email) {//validação1 se o email dele é diferente do banco
                const userExist = await User.findOneEmail(email);
                if (userExist) {//validação2 de email valido
                    return res.status(400).json({ error: "Email already exists." })
                }
            }
//------------//-----------------///----------------comparando senha//------------//-----------------///----------------
            const passwordExist = await User.findHashById(id);//validação1 de senha, se confere a senha antiga com o banco
            if(oldPassword && !(await bcrypt.compare(oldPassword, passwordExist.password_hash))) {
                return res.status(401).json({ error: "Password does not match"})
            }
            await User.update(id, name, email, password);
            return res.json({
                user
            }); 
            
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            let id = req.userId            
            let user = await User.findDelete(id);
            if(id === user.id){//validação se ja n foi excluido!
                return res.json({ msg: "você já enviou solitação para deletar! "})
            }
            await User.softDelete(id);
            return res.status(200).json({ msg: "Deletado!" });

        } catch (error) {
            next(error)
        }
    }

}

export default new UserController();