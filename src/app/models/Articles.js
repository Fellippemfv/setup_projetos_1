import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";
import slugify from "slugify";
import dateFormat from "dateformat";

dateFormat.masks.dateBr = 'dd/mm/yyyy "às" HH:MM:ss';//Modelo de data ao estilo brasileiro

//criando classe
class Article{
    async findAll(num){//retorna lista de usuarios
        try{
            let result = await knex("articles").orderBy("id", "desc").select("id" ,"title", "slug", "description_home").where( "deleted_at", "0000-00-00 00:00:00").paginate({ perPage: 5, currentPage: num });
            return result.data;
        }catch(error){
            console.log(error);
        }
    }

    async findAllPages(num){//retorna lista de usuarios
        try{
            let result = await knex("articles").orderBy("id", "desc").select("title", "slug", "description_home").where( "deleted_at", "0000-00-00 00:00:00").paginate({ perPage: 6, currentPage: num });
            return result.data; 
        }catch(error){
            console.log(error);
        }
    }


//--------//----------//------CATEGORIA-----//------------//------------//
    async findAllCategory(slug, num){//retorna lista de usuarios//reformar a tabela => id deve ser slug
        try{
            let result = await knex.select("articles.id", "articles.title", "articles.description_home", "articles.slug", "categories1.title as cat_title").table("articles").orderBy("id", "desc").innerJoin("categories1", "articles.category_id", "categories1.id").where({  "categories1.slug": slug  }).paginate({ perPage: 6, currentPage: num })
            return result.data;
        }catch(error){
            console.log(error);
        }
    }

    async findAllCategory2(slug, num){//retorna lista de usuarios//reformar a tabela => id deve ser slug
        try{
            let result = await knex.select("articles.id", "articles.title", "articles.description_home", "articles.slug", "categories2.title as cat_title").table("articles").orderBy("id", "desc").innerJoin("categories2", "articles.category2_id", "categories2.id").where({  "categories2.slug": slug  }).paginate({ perPage: 6, currentPage: num })
            
            //let result = await knex.select("articles.id", "articles.title", "articles.description_home", "articles.slug", "categories2.id as cat2_id").table("articles").innerJoin("categories2", "articles.category2_id", "categories2.id").where({  "categories2.slug": slug  })
            return result.data;
        }catch(error){
            console.log(error);
        }
    }

    async findOneArticle(slug){//retorna lista de usuarios
        try{
            
            let result = await knex.select("articles. *", "categories1.title as cat_title", "categories2.title as cat2_title", "users.name as us_name", "users.img_file as us_img").table("articles").innerJoin("categories1", "articles.category_id", "categories1.id").innerJoin("categories2", "articles.category2_id", "categories2.id").innerJoin("users", "articles.user_id", "users.id").where({ "articles.slug": slug })

            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async findAllDeleted(num){//retorna lista de usuarios
        try{
            let result = await knex("articles").orderBy("id", "desc").select("id" ,"title", "slug", "description_home").whereNot( "deleted_at", "0000-00-00 00:00:00").paginate({ perPage: 5, currentPage: num });
            return result.data;
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
            let result = await knex.select("articles. *", "categories1.title as cat_title", "categories2.title as cat2_title").table("articles").innerJoin("categories1", "articles.category_id", "categories1.id").innerJoin("categories2", "articles.category2_id", "categories2.id").where({ "articles.id": id })
            return result[0];
        }catch(error){
            console.log(error);
        }
    }

    async create(title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category1, category2, user_id){//retorna lista de usuarios
        try{
            let result = await knex("articles").insert({ title, slug, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, "category_id": category1, "category2_id": category2, user_id ,"created_at": dateFormat(new Date(), "dateBr"), "updated_at": dateFormat(new Date(), "dateBr") })
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async update(id, title, exp_image_home, description_home, materials, steps_by_step, exp_video, exp_image_done, exp_image_initial, tips_important, tips_ead, category_id, category2_id){//retorna lista de usuarios
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