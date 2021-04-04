import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";

//criando classe
class Category1{

    async findAllForView(){//retorna lista de usuarios
        try{
            let result = await knex("categories1").select("id" ,"title", "slug");
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findAll(num){//retorna lista de usuarios
        try{
            let result = await knex("categories1").orderBy("id", "desc").select("id" ,"title", "slug").paginate({ perPage: 5, currentPage: num });
            return result.data;
        }catch(error){
            console.log(error);
        }
    }

    async findById(id){//retorna lista de usuarios
        try{
            let result = await knex("categories1").where({ id }).select([ "id", "title" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }


    async create(title, slug){//retorna lista de usuarios
        try{
            let result = await knex("categories1").insert({ title, slug })
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async update(id, title, slug){//retorna lista de usuarios
        try{
            let result = await knex("categories1").where({ id }).update({ title, slug, "updated_at": new Date()});
            return result[0];
        }catch(error){
            console.log(error);
        }

    }

    async deleteHard(id){//retorna lista de usuarios
        try{
            let result = await knex("categories1").where({ id }).delete();
            return result[0];
        }catch(error){
            console.log(error);
        }

    }


}

export default new Category1();