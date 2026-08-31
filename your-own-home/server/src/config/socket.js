const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const logger = require('../utils/logger');

let io;

// userId -> Set of socket ids (a user can have multiple tabs/devices open)
const onlineUsers = new Map();

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // Auth middleware: verifies the same JWT cookie used by the REST API,
  // so a browser session is valid for both HTTP and WebSocket traffic.
  io.use((socket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;
      if (!rawCookie) return next(new Error('Authentication required'));

      const parsed = cookie.parse(rawCookie);
      const token = parsed.accessToken;
      if (!token) return next(new Error('Authentication required'));

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`Socket connected: user ${socket.userId}`);

    if (!onlineUsers.has(socket.userId)) onlineUsers.set(socket.userId, new Set());
    onlineUsers.get(socket.userId).add(socket.id);
    io.emit('presence:update', { userId: socket.userId, online: true });

    // Messaging event handlers are registered here in the Messaging phase:
    // require('../sockets/messageSocket')(io, socket);

    socket.on('disconnect', () => {
      const sockets = onlineUsers.get(socket.userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(socket.userId);
          io.emit('presence:update', { userId: socket.userId, online: false });
        }
      }
      logger.info(`Socket disconnected: user ${socket.userId}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

const isUserOnline = (userId) => onlineUsers.has(userId.toString());

module.exports = { initSocket, getIO, isUserOnline };
