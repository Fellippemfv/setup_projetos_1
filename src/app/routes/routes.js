import { Router } from "express";
import express from "express";
import Project from "../controllers/Project"
import User from "../controllers/User";

const routes = new Router();

routes
    //Users
    .get("/", User.index)
    .get("/users", User.find)
    .post("/users", User.create)
    .put("/users/:id", User.update)
    .delete("/users/:id", User.delete)
    // Projects
    .get("/projects", Project.find)
    .post("/projects", Project.create)
    .put("/projects/:id", Project.update)
    .delete("/projects/:id", Project.delete)




export default routes;