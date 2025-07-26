// server.js
import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ServiceChattingRun from './Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection
wss.on('connection', (ws) => {
  const service = new ServiceChattingRun(ws);

  ws.on('message', (msg) => {
    service.OnMessage(msg, ws);
  });

  ws.on('close', () => {
    service.OnClose(ws);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
