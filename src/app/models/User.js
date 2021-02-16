import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database"

//criando classe
class User{

    async find_users(){//lista de usuarios
        try{
            let result = await knex("users").where("deleted_at", "0000-00-00 00:00:00")
            //await knex("users").whereNotNull("deleted_at")//trazer apenas usuarios nao deletados
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async create_user(username){//parametro que espero pegar
        try{
            let result = await knex("users").insert({ username })//repasso esse parametro pra cá
            return result;
        }catch(error){
            console.log(error);
        }
    }

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
}

export default new User();