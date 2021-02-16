import User from "../models/User"

class UserController{

    async index(req, res, next) {
    try{
        res.render("index");
    }catch(error){
        next(error);
    }
}

    async find(req, res, next) {
        try{
            let users = await User.find_users();
            res.json(users);
        }catch(error){
            next(error);
        }
    }

    async create(req, res, next) {
          try{
            const { username } = req.body;
            const user = await User.create_user(username)
            return res.status(201).send()
          }catch(error){
            next(error)
          }
    }
       
    async update(req, res, next) {
        try {
            const { username } = req.body;
            const { id } = req.params;

            const user = await User.update_user(id, username);
            return res.status(200).send();
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.delete_user(id);
            return res.status(200).send();
        } catch (error) {
            next(error)
        }
    }


}





export default new UserController();