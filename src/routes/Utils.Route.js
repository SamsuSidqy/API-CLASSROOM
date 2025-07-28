import express from "express"
import FilesOpens from '../controllers/Utils.Control.FileOpen.js'
import ProfileOpens from '../controllers/Utils.Control.ProfileOpen.js'

const routeUtils = new express.Router()

routeUtils.get('/open/:filename',FilesOpens)
routeUtils.get('/profile/:filename',ProfileOpens)

export default routeUtils