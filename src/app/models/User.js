import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

//criando classe
class User{

    async findAll(){//lista de usuarios
        try{
            let result = await knex("users").where("deleted_at", "0000-00-00 00:00:00")
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findEmail(email){//encontra email
        try{
            let result = await knex("users").where({ email: email })
            if(result.length > 0) {
                return true;
            }else {
                return false;
            }
        }catch(error){
            console.log(error);
        }
    }

    async findByEmail(email){//encontra email
        try{
            let result = await knex("users").where({ email: email }).select(["id", "email", "name", "password_hash", "provider"])
            if(result.length > 0) {
                return result[0];
            }else {
                return undefined;
            }
        }catch(error){
            console.log(error);
        }
    }
    
    async create_user(name, email, password, provider){//parametro que espero pegar
        try{
            const hash = await bcrypt.hash(password, 8)
            let result = await knex("users").insert({ name, email, password_hash: hash, provider })//repasso esse parametro pra cá
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findById(id) {
        try {
            const result = await knex("users").where({id})
            return result;
        } catch (error) {
            
        }
    }


    async update_user(id, email, name){
        try {
            let result = await knex("users").where({ id }).update({ email, name, "updated_at": new Date() });
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    /*
    async delete_user(id){
        try {
            let result = await knex("users").where({ id }).update("deleted_at", new Date())
            //.del();
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    */
}

export default new User();