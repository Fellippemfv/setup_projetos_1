import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";
import slugify from "slugify";


//criando classe
class Article{
    async findAll(){//retorna lista de usuarios
        try{
            let result = await knex("articles").where( "deleted_at", "0000-00-00 00:00:00")
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findOne(slug){//retorna lista de usuarios
        try{
            let result = await knex("articles").where({ slug })
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async findAllDeleted(){//retorna lista de usuarios
        try{
            let result = await knex("articles").whereNot("deleted_at", "0000-00-00 00:00:00")
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findById(id){//retorna lista de usuarios
        try{
            let result = await knex("articles").where({ id }).select(["id", "title", "exp_image_home", "description_home", "materials", "steps_by_step", "exp_video", "exp_image_done", "exp_image_initial", "tips_important", "tips_ead", "updated_at" ])
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async create(title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category, category2, category3){//retorna lista de usuarios
        try{
            let result = await knex("articles").insert({ title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, "category_id": category, "category2_id": category2, "category3_id": category3 })
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async update(id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead){//retorna lista de usuarios
        try{
            if(title){
                const slug = slugify(title)
                let result = await knex("articles").where({ id }).update({ title, slug, "updated_at": new Date() });
                return true;
            }

            if(exp_image_home){
                let result = await knex("articles").where({ id }).update({ exp_image_home, "updated_at": new Date() });
                return true;
            }

            if(description_home){
                let result = await knex("articles").where({ id }).update({ description_home, "updated_at": new Date() });
                return true;
            }

            if(materials){
                let result = await knex("articles").where({ id }).update({ materials, "updated_at": new Date() });
                return true;
            }

            if(steps_by_step){
                let result = await knex("articles").where({ id }).update({ steps_by_step, "updated_at": new Date() });
                return true;
            }

            if(exp_video){
                let result = await knex("articles").where({ id }).update({ exp_video, "updated_at": new Date() });
                return true;
            }

            if(exp_image_done){
                let result = await knex("articles").where({ id }).update({ exp_image_done, "updated_at": new Date() });
                return true;
            }

             if(exp_image_initial){
                let result = await knex("articles").where({ id }).update({ exp_image_initial, "updated_at": new Date() });
                return true;
            }

            if(tips_important){
                let result = await knex("articles").where({ id }).update({ tips_important, "updated_at": new Date() });
                return true;
            }

            if(tips_ead){
                let result = await knex("articles").where({ id }).update({ tips_ead, "updated_at": new Date() });
                return true;
            }

            
            
        }catch(error){
            console.log(error);
        }

    }

    async softDelete(id){
        try {
            let result = await knex("articles").where({ id }).update({ "deleted_at": new Date() })
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async hardDelete(id){//retorna lista de usuarios
        try{
            let result = await knex("articles").where({ id }).delete();
            return result[0];
        }catch(error){
            console.log(error);
        }

    }

    async backDelete(id){
        try {
            let result = await knex("articles").where({ id }).update({ "deleted_at": "0000-00-00 00:00:00" })
            return result
        } catch (error) {
            console.log(error)
        }
    }



}

export default new Article();