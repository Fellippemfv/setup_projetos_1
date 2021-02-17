import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database"
import bcrypt from "bcrypt"

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

    async create(name, email, password, provider){//parametro que espero pegar
        try{
            const hash = await bcrypt.hash(password, 8)
            let result = await knex("users").insert({ name, email, password_hash: hash, provider })//repasso esse parametro pra cá
            return result;
        }catch(error){
            console.log(error);
        }
    }
/*
    async update_user(id, username){
        try {
            let result = await knex("users").where({ id }).update({ username, "updated_at": new Date() });
            return result;
        } catch (error) {
            console.log(error)
        }
    }

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