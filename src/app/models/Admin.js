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

    async update(id, name, email, password){//faz update dos dados
        try {
            if(name){
                let result = await knex("users").where({ id }).update({ name, "updated_at": new Date() });
            }

            if(email){
                let result = await knex("users").where({ id }).update({ email, "updated_at": new Date() });
            }

            if(password){
                const hash = await bcrypt.hash(password, 8)
                let result = await knex("users").where({ id }).update({ password_hash: hash, "updated_at": new Date() });
            }
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
/*

async findDelete(id){
        try{
            let result = await knex("users").whereNot({ deleted_at: "0000-00-00 00:00:00" }).where({ id }).select("id");
            if(result.length > 0) {
                return result[0];
            }else {
                return id;
            }
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

    async findByEmail(email){//retorna algumas informações a partir do email
        try{
            let result = await knex("users").where({ email }).select([ "id", "email", "name", "provider"])
            if(result.length > 0) {
                return result[0];
            }else {
                return undefined;
            }
        }catch(error){
            console.log(error);
        }
    }

    async findById(id) {//retorna algumas informações a partir do id
        try {
            const result = await knex("users").where({ id }).select("id", "email", "name", "provider");
            return result;
        } catch (error) {
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

    async findHashByEmail(email){//retorna hash
        try {
            let result = await knex("users").where({ email }).select("password_hash")
            return result[0];
        } catch (error) {
            console.log(error)
        }
    }
    
    async create(name, email, password, provider){//cria novo usuário
        try{
            const hash = await bcrypt.hash(password, 8)
            let result = await knex("users").insert({ name, email, password_hash: hash, provider })//repasso esse parametro pra cá
            return result;
        }catch(error){
            console.log(error);
        }
    }


    */
    
}

export default new User();