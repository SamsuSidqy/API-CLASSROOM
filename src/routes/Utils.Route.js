import express from "express"
import FilesOpens from '../controllers/Utils.Control.FileOpen.js'

const routeUtils = new express.Router()

routeUtils.get('/open/:filename',FilesOpens)

export default routeUtils