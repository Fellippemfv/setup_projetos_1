import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";

//criando classe
class Article{
    async findAll(){//retorna lista de usuarios
        try{
            let result = await knex("users").where({ id }).select(["title", "picture", "description" , ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async findById(id){//retorna lista de usuarios
        try{
            let result = await knex("users").where({ id }).select(["name", "email" , "updated_at" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

}

export default new Article();