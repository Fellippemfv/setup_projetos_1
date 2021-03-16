import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";

//criando classe
class Category{
    async findAll(){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ id }).select([ "title" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async findById(id){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ id }).select([ "title" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async create(title){//retorna lista de usuarios
        try{
            let result = await knex("categories").insert({ title })
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async update(id, title){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ id }).update({ title });
            return result[0];
        }catch(error){
            console.log(error);
        }

    }

    async delete(id){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ id }).delete();
            return result[0];
        }catch(error){
            console.log(error);
        }

    }


}

export default new Category();