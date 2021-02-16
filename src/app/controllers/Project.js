import { count } from "../../database";
import Project from "../models/Project"


class ProjectController{

  async find(req, res, next) {
        try{
            const { user_id, page = 1} = req.query;
            const projects = await Project.find_projects(user_id, page)

            res.json(projects);
        }catch(error){
            next(error);
        }
  }

  async create(req, res, next) {
        try{
          const { title, user_id } = req.body;
          const project = await Project.create_project(title, user_id)

          return res.status(201).send()
        }catch(error){
          next(error)
        }
  }

  async update(req, res, next) {
    try {
        const { title } = req.body;
        const { id } = req.params;

        const project = await Project.update_project(id, title);
        return res.status(200).send();
    } catch (error) {
        next(error)
    }
  }

  async delete(req, res, next) {
    try {
        const { id } = req.params;

        const project = await Project.delete_project(id);
        return res.status(200).send();
    } catch (error) {
        next(error)
    }
}

    


}





export default new ProjectController();