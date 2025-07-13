import express from "express"
import {
	RegisterControl,
	LoginControl,
	RefreshTokenControl
} from '../controllers/Users.Control.js'
import Authorization from '../middleware/Authorization.js'

const routeUsers = new express.Router()

routeUsers.use(express.json())
routeUsers.post("/register", RegisterControl)
routeUsers.post("/login", LoginControl)
routeUsers.use(Authorization)
routeUsers.get("/refresh",RefreshTokenControl)

export default routeUsers