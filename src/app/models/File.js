import { next } from "sucrase/dist/parser/tokenizer";
import knex from "../../database";

//criando classe
class File{

    async update(id, originalname, filename){//retorna lista de usuarios
        try{
            let result = await knex("users").where({ id }).update({ "img_name": originalname, "img_file":"/files/"+filename ,"updated_at": new Date() });
            return true;
        }catch(error){
            console.log(error);
        }
    }

    

}

export default new File();