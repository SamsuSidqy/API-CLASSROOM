import express from 'express'

import routeUsers from './routes/Users.Route.js'
import routeKelas from './routes/Kelas.Route.js'
import {RequestErrors} from './utils/ErrorsHandler.js'

const app = express();

app.use(routeUsers)
app.use(routeKelas)

app.use((req,res) => {
	res.status(503)
})
app.use(RequestErrors)

export default app;