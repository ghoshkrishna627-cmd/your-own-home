const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Establishes the MongoDB connection using Mongoose.
 * Exits the process on failure so the app never runs against a broken DB layer.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment');
    }

    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(uri);

    logger.info(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
