// Service.js
import WebSocket from 'ws';
import Messages from '../models/Message.js'

export default class ServiceChattingRun {
  static rooms = new Map();        
  static clientInfo = new Map();   

  constructor(ws) {
    this.ws = ws;
  }

  OnUsersOnline(room) {
    const clients = ServiceChattingRun.rooms.get(room);
    if (clients) {
      const users = Array.from(clients).map(client => ServiceChattingRun.clientInfo.get(client)?.user);
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'users', users }));
        }
      }
    }
  }

  MessageRoom(room, senderName, message, senderSocket = null) {
    const clients = ServiceChattingRun.rooms.get(room);
    if (clients) {
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN  && client !== senderSocket ) {
          client.send(JSON.stringify({
            type: 'message',
            text: message,
            sender: senderName
          }));
        }
      }
    }
  }

  OnJoin(room, user) {
    if (!ServiceChattingRun.rooms.has(room)) {
      ServiceChattingRun.rooms.set(room, new Set());
    }
    if (!ServiceChattingRun.clientInfo.has(this.ws)) {
      ServiceChattingRun.clientInfo.set(this.ws, { user, room });
    }

    ServiceChattingRun.rooms.get(room).add(this.ws);

    this.OnUsersOnline(room);
  }

  OnMessage(message, ws) {
    let data;
    try {
      data = JSON.parse(message);
    } catch (err) {
      console.error('Invalid JSON received:', message);
      return;
    }

    if (data.type === 'join') {
      this.OnJoin(data.room, data.users);
    }

    if (data.type === 'message') {
      const info = ServiceChattingRun.clientInfo.get(ws);
      if (info?.room) {
        this.MessageRoom(info.room, info.user, data.message, ws);
        const message = new Messages();
        message.init()
          .then(() => {
            const dataSave = {
              kode_room: info.room,            
              users: info.user.id_users,
              message: data.message,
            };
            
            return message.SavePesan(dataSave);
          })
          .catch(err => {
            console.log('Error saving message:', err);
          });
      }
    }
  }

  OnClose(ws) {
    const info = ServiceChattingRun.clientInfo.get(ws);
    if (info?.room) {
      const roomClients = ServiceChattingRun.rooms.get(info.room);
      if (roomClients) {
        roomClients.delete(ws);
        if (roomClients.size === 0) {
          ServiceChattingRun.rooms.delete(info.room);
        }
        this.OnUsersOnline(info.room);
      }
    }

    ServiceChattingRun.clientInfo.delete(ws);
  }
}
