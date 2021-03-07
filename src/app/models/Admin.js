import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

//criando classe
class User{

    async findAll(){//retorna lista de usuarios
        try{
            let result = await knex("users").where("deleted_at", "0000-00-00 00:00:00")
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findAllDeleted(){//retorna lista de usuarios
        try{
            let result = await knex("users").whereNot("deleted_at", "0000-00-00 00:00:00")
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async update(id, provider){//faz update dos dados
        try {
            let result = await knex("users").where({ id }).update({ provider, "updated_at": new Date() });
            
        } catch (error) {
            console.log(error)
        }
    }

    async hardDelete(id){
        try {
            let result = await knex("users").where({ id }).delete()
        } catch (error) {
            console.log(error)
        }
    }

    
}

export default new User();