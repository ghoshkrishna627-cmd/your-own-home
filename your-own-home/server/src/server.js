require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { initSocket } = require('./config/socket');

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

// Socket.io attaches to the same HTTP server so it shares the port
// (and, in production, the same TLS termination at the host provider).
initSocket(httpServer);

const start = async () => {
  await connectDB();
  httpServer.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

start();

// Fail loudly instead of leaving the process in a broken state
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  httpServer.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
