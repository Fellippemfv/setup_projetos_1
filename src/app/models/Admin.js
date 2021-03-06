import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

//criando classe
class User{

    async findAll(num){//retorna lista de usuarios
        try{
            let result = await knex("users").orderBy("id", "desc").select("id", "img_file","name", "email", "provider").where( "deleted_at", "0000-00-00 00:00:00").paginate({ perPage: 5, currentPage: num });
            return result.data;
        }catch(error){
            console.log(error);
        }
    }

    async findAllDeleted(num){//retorna lista de usuarios
        try{
            let result = await knex("users").orderBy("id", "desc").select("id", "img_file" ,"name", "email", "provider").whereNot( "deleted_at", "0000-00-00 00:00:00").paginate({ perPage: 5, currentPage: num });
            return result.data;
        }catch(error){
            console.log(error);
        }
    }

    async update(id, provider){//faz update dos dados
        try {
            let result = await knex("users").where({ id }).update({ provider, "updated_at": new Date() });
            return result;
            
        } catch (error) {
            console.log(error)
        }
    }

    async softDelete(id){
        try {
            let result = await knex("users").where({ id }).update({ "deleted_at": new Date() })
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async hardDelete(id){
        try {
            let result = await knex("users").where({ id }).del()
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async backDelete(id){
        try {
            let result = await knex("users").where({ id }).update({ "deleted_at": "0000-00-00 00:00:00" })
            return result
        } catch (error) {
            console.log(error)
        }
    }

    
}

export default new User();