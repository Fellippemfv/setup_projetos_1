import { Router } from "express";
import express from "express";
import User from "../controllers/User";
import Session from "../controllers/Session"

const routes = new Router();

routes
    //Users
    .get("/", User.index)
    .get("/users", User.find)
    .post("/users", User.create)

    //Sessions
    .post("/sessions", Session.store);

    /*
    .post("/users", User.create)
    .put("/users/:id", User.update)
    .delete("/users/:id", User.delete)
    */
    




export default routes;