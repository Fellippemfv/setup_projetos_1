import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";

//criando classe
class Article{
    async findAll(){//retorna lista de usuarios
        try{
            let result = await knex("articles").where({ id })
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

    async create(title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial){//retorna lista de usuarios
        try{
            let result = await knex("categories").insert({ title })
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async update(id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial){//retorna lista de usuarios
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

export default new Article();