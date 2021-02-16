import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database"

//criando classe
class Project{

    async find_projects(user_id,  page){//lista de projetos
        try{
            const query = knex("projects")
            .where("deleted_at", "0000-00-00 00:00:00")
            .limit(5)//limite de paginação
            .offset((page - 1 ) * 5)

            if(user_id) {
                query
                .where({ user_id })
                .join("users", "users.id", "=", "projects.user_id")
                .select("projects.*", "users.username")
                .where("deleted_at", "0000-00-00 00:00:00")
            }
            const result = await query;

            return (result);
        }catch(error){
            console.log(error);
        }
    }

    async create_project(title, user_id){
        try{
            let result = await knex("projects").insert({ 
                title,
                user_id
            })
            
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async update_project(id, title){
        try {
            let result = await knex("projects").where({ id }).update({ title, "updated_at": new Date() });
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async delete_project(id){
        try {
            let result = await knex("projects").where({ id }).update("deleted_at", new Date())
            //.del();
            return result;
        } catch (error) {
            console.log(error)
        }
    }


}

export default new Project();