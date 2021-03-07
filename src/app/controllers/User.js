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


    async getProfile(req, res, next) {
        try{
            res.render("profile");
        }catch(error){
            next(error);
        }
    }

    async myProfile(req, res, next) {
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