import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

//criando classe
class User{

    async findById(id){//retorna lista de usuarios
        try{
            let result = await knex("users").where({ id }).select(["id", "description", "name", "email" , "updated_at", "img_file", "provider" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async findOneEmail(email){//retorna se email existe
        try{
            let result = await knex("users").where({ email })
            if(result.length > 0) {
                return true;
            }else {
                return false;
            }
        }catch(error){
            console.log(error);
        }
    }

    async findHashById(id){//retorna hash
        try {
            let result = await knex("users").where({ id }).select("password_hash")
            return result[0];
        } catch (error) {
            console.log(error)
        }
    }

    async update(description, id, name, email, password, deleted){//faz update dos dados
        try {

            if(description){
                let result = await knex("users").where({ id }).update({ description, "updated_at": new Date() });
                return result
            }

            if(name){
                let result = await knex("users").where({ id }).update({ name, "updated_at": new Date() });
                return result
            }

            if(email){
                let result = await knex("users").where({ id }).update({ email, "updated_at": new Date() });
                return result

            }

            if(password){
                const hash = await bcrypt.hash(password, 8)
                let result = await knex("users").where({ id }).update({ password_hash: hash, "updated_at": new Date() });
                return result
            }

            if(deleted){
                let result = await knex("users").where({ id }).update("deleted_at", new Date())
                return result
            }

        } catch (error) {
            console.log(error)
        }
    }

    async findUserById(id){//retorna lista de usuarios
        try{
            let result = await knex("users").where({ id }).select(["description", "name", "img_file" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

}

export default new User();