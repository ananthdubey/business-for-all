const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');
const dbState = require('./dbState');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    dbState.setReady(true);
    logger.info(`MongoDB connected: ${connection.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      dbState.setError(new Error('MongoDB disconnected'));
      logger.error('MongoDB disconnected');
    });

    mongoose.connection.on('error', (error) => {
      dbState.setError(error);
      logger.error('MongoDB connection error', error);
    });

    return connection;
  } catch (error) {
    dbState.setError(error);
    throw error;
  }
};

module.exports = connectDB;
