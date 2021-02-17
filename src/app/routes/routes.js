import { Router } from "express";
import express from "express";
import User from "../controllers/User";

const routes = new Router();

routes
    //Users
    .get("/", User.index)
    .get("/users", User.find)
    .post("/users", User.create)

    /*
    .post("/users", User.create)
    .put("/users/:id", User.update)
    .delete("/users/:id", User.delete)
    */
    




export default routes;