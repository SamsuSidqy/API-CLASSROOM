import CreateKelas from '../controllers/Kelas.Control.Create.js'
import express from 'express'

const routeKelas = new express.Router()

routeKelas.use(express.json())
routeKelas.post('/kelas',CreateKelas)


export default routeKelas