import express from "express"
import {signIn,signUp,logout} from "../controllers/authControllers.js"

const routes=express.Router()

routes.post("/signUp",signUp)
routes.post("/signIn",signIn)
routes.post("/logout",logout)

export default routes

