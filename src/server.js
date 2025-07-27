import express from 'express'
import {WebSocketServer} from 'ws'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'

import routeUsers from './routes/Users.Route.js'
import routeKelas from './routes/Kelas.Route.js'
import routeUtils from './routes/Utils.Route.js'

import {RequestErrors} from './utils/ErrorsHandler.js'

import ServiceChattingRun from './services/Chatting.Service.js'

const servers = express();
const app = http.createServer(servers);
const wss = new WebSocketServer({ server: app });

wss.on('connection',(ws) => {
	const service = new ServiceChattingRun(ws)
	ws.on('message',(msg) => {		
		service.OnMessage(msg,ws)
	})
	ws.on('close',() => {
		service.OnClose(ws)
	})
})

servers.use(cors())
servers.use(bodyParser.json({ limit: '20mb' }));
servers.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
servers.use(routeUtils)
servers.use(routeUsers)
servers.use(routeKelas)

servers.use((req,res) => {
	res.status(503)
})
servers.use(RequestErrors)

export default app;