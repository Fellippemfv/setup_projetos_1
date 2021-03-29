import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";

//criando classe
class Category{
    async findAll(){//retorna lista de usuarios
        try{
            let result = await knex("categories").select([ "id", "title", "slug" ])
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findById(id){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ id }).select([ "id", "title" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async findBySlug(slug){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ slug }).select([ "id", "title" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async create(title, slug){//retorna lista de usuarios
        try{
            let result = await knex("categories").insert({ title, slug })
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async update(id, title, slug){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ id }).update({ title, slug, "updated_at": new Date()});
            return result[0];
        }catch(error){
            console.log(error);
        }

    }

    async deleteHard(id){//retorna lista de usuarios
        try{
            let result = await knex("categories").where({ id }).delete();
            return result[0];
        }catch(error){
            console.log(error);
        }

    }


}

export default new Category();