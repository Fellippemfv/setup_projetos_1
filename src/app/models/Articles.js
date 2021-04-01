import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";
import slugify from "slugify";
import dateFormat from "dateformat";

dateFormat.masks.dateBr = 'dd/mm/yyyy "às" HH:MM:ss';//Modelo de data ao estilo brasileiro

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

    async findAllLastPage(){//retorna lista de usuarios
        try{
            let result = await knex("articles").select("title", "slug", "description_home").where( "deleted_at", "0000-00-00 00:00:00").paginate({ perPage: 6, currentPage: 1 })
            return result.data; 
        }catch(error){
            console.log(error);
        }
    }

    async findAllPages(num){//retorna lista de usuarios
        try{
            let result = await knex("articles").select("title", "slug", "description_home").where( "deleted_at", "0000-00-00 00:00:00").paginate({ perPage: 6, currentPage: num })
            return result.data; 
        }catch(error){
            console.log(error);
        }
    }

    async findAllCategory(slug){//retorna lista de usuarios//reformar a tabela => id deve ser slug
        try{
            let result = await knex.select("articles.id", "articles.title", "articles.description_home", "articles.slug", "categories.id as cat_id", "categories.title as cat_title").table("articles").innerJoin("categories", "articles.category_id", "categories.id").where({  "categories.slug": slug  })
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findAllCategory2(slug){//retorna lista de usuarios//reformar a tabela => id deve ser slug
        try{
            let result = await knex.select("articles.id", "articles.title", "articles.description_home", "articles.slug", "categories2.id as cat2_id").table("articles").innerJoin("categories2", "articles.category2_id", "categories2.id").where({  "categories2.slug": slug  })
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findAllCategory3(slug){//retorna lista de usuarios//reformar a tabela => id deve ser slug
        try{
            let result = await knex.select("articles.id", "articles.title", "articles.description_home", "articles.slug", "categories3.id as cat_id").table("articles").innerJoin("categories3", "articles.category3_id", "categories3.id").where({  "categories3.slug": slug  })
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async findOneArticle(slug){//retorna lista de usuarios
        try{
            let result = await knex.select("articles. *", "categories.title as cat_title", "categories2.title as cat2_title", "categories3.title as cat3_title", "users.name as us_name", "users.img_file as us_img").table("articles").innerJoin("categories", "articles.category_id", "categories.id").innerJoin("categories2", "articles.category2_id", "categories2.id").innerJoin("categories3", "articles.category3_id", "categories3.id").innerJoin("users", "articles.user_id", "users.id").where({ "articles.slug": slug })
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

    async findByIdArticle(id){//retorna lista de usuarios
        try{
            let result = await knex.select("articles. *", "categories.title as cat_title", "categories2.title as cat2_title", "categories3.title as cat3_title").table("articles").innerJoin("categories", "articles.category_id", "categories.id").innerJoin("categories2", "articles.category2_id", "categories2.id").innerJoin("categories3", "articles.category3_id", "categories3.id").where({ "articles.id": id })
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async create(title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category, category2, category3, user_id){//retorna lista de usuarios
        try{
            let result = await knex("articles").insert({ title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, "category_id": category, "category2_id": category2, "category3_id": category3, user_id ,"created_at": dateFormat(new Date(), "dateBr"), "updated_at": dateFormat(new Date(), "dateBr") })
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async update(id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category_id, category2_id, category3_id){//retorna lista de usuarios
        try{
            if(title){
                const slug = slugify(title)

                let result = await knex("articles").where({ id }).update({ title, slug, "updated_at": dateFormat(new Date(), "dateBr") });  
                return true;
            }

            if(exp_image_home){
                let result = await knex("articles").where({ id }).update({ exp_image_home, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(description_home){
                let result = await knex("articles").where({ id }).update({ description_home, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(materials){
                let result = await knex("articles").where({ id }).update({ materials, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(steps_by_step){
                let result = await knex("articles").where({ id }).update({ steps_by_step, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(exp_video){
                let result = await knex("articles").where({ id }).update({ exp_video, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(exp_image_done){
                let result = await knex("articles").where({ id }).update({ exp_image_done, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

             if(exp_image_initial){
                let result = await knex("articles").where({ id }).update({ exp_image_initial, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(tips_important){
                let result = await knex("articles").where({ id }).update({ tips_important, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(tips_ead){
                let result = await knex("articles").where({ id }).update({ tips_ead, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(category_id){
                let result = await knex("articles").where({ id }).update({ category_id, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(category2_id){
                let result = await knex("articles").where({ id }).update({ category2_id, "updated_at":  dateFormat(new Date(), "dateBr") });
                return true;
            }

            if(category3_id){
                let result = await knex("articles").where({ id }).update({ category3_id, "updated_at":  dateFormat(new Date(), "dateBr") });
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