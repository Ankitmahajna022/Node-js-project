import { signIn, signUp } from "../controllers/authControllers.js";
import express from "express";
import { checkAlreadyLogin, checkAuthReques } from "../middleware/auth_middelware.js";



const routes= express.Router()


routes.post("/signup",checkAuthReques,signUp)
routes.post("/signin",checkAlreadyLogin, signIn);

export default routes