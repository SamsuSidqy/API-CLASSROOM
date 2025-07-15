const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

// Struktur: roomName => Set of clients
const rooms = new Map();

// Struktur: ws => { name, room }
const clientsInfo = new Map();

function joinRoom(roomName, ws, name) {
  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Set());
  }
  rooms.get(roomName).add(ws);
  clientsInfo.set(ws, { name, room: roomName });

  // Broadcast join info
  broadcastUserList(roomName);
  broadcastToRoom(roomName, `🔵 ${name} bergabung ke room.`, ws);
}

function broadcastToRoom(roomName, message, sender = null) {
  const clients = rooms.get(roomName);
  if (clients) {
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN && client !== sender) {
        client.send(JSON.stringify({ type: 'message', text: message }));
      }
    }
  }
}

function broadcastUserList(roomName) {
  const clients = rooms.get(roomName);
  if (clients) {
    const users = Array.from(clients).map(client => clientsInfo.get(client)?.name);
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'users', users }));
      }
    }
  }
}

wss.on('connection', (ws) => {
  ws.on('message', (rawMessage) => {
    const data = JSON.parse(rawMessage);

    if (data.type === 'join') {
      joinRoom(data.room, ws, data.name);
      ws.send(JSON.stringify({ type: 'message', text: `✅ Selamat datang di room ${data.room}` }));
    }

    if (data.type === 'message') {
      const info = clientsInfo.get(ws);
      if (info?.room) {
        const msg = `${info.name}: ${data.text}`;
        broadcastToRoom(info.room, msg, ws);
        ws.send(JSON.stringify({ type: 'message', text: `(Anda): ${data.text}` }));
      }
    }
  });

  ws.on('close', () => {
    const info = clientsInfo.get(ws);
    if (info?.room && rooms.has(info.room)) {
      rooms.get(info.room).delete(ws);
      broadcastToRoom(info.room, `🔴 ${info.name} keluar dari room.`);
      broadcastUserList(info.room);
    }
    clientsInfo.delete(ws);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
