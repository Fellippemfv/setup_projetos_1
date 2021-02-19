import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import knex from "../../database";




class UserController{

    async index(req, res, next) {
        try{
            res.render("index");
        }catch(error){
            next(error);
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

    async create(req, res, next) {
          try{
            
            const { name, email, password } = req.body;
            const provider = 0
            if(email === undefined) {//validaçao1 de valor indefinido
                return res.status(400).json({ error: "Invalid email" })
            }

            const userExist = await User.findEmail(email);
            if (userExist) {//validação2 de email
                return res.status(400).json({ error: "User already exists." })
            }

            const user = await User.create_user(name, email, password, provider)
            return res.status(201).json({name, email, provider})
          }catch(error){
            next(error)
          }
    }

    async update(req, res, next) {
        try {
//------------//-----------------///---------------- email
            const { email, oldPassword, name } = req.body;
            const id = req.userId
            const user = await User.findById(id)
            if(email && email != user.email) {//validação1 se o email dele é diferente do banco
                
                const userExist = await User.findEmail(email);
                if (userExist) {//validação2 de email
                    return res.status(400).json({ error: "User already exists." })
                }
            }
//------------//-----------------///---------------- senha
            const passwordExist = await User.password_hash(id);//validação1 de senha, se confere a senha antiga com o banco
            if(oldPassword && !(await bcrypt.compare(oldPassword, passwordExist.password_hash))) {
                return res.status(401).json({ error: "Password does not match"})
            }
            
            await User.update_user(id, email, name);
            return res.json({
                user
            }); 
            

        } catch (error) {
            next(error)
        }
    }
/*
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.delete_user(id);
            return res.status(200).send();
        } catch (error) {
            next(error)
        }
    }

*/
}





export default new UserController();