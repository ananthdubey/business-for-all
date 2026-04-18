const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');
const dbState = require('./dbState');

let listenersBound = false;

const bindConnectionListeners = () => {
  if (listenersBound) {
    return;
  }

  listenersBound = true;

  mongoose.connection.on('connected', () => {
    dbState.setReady(true);
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
  });

  mongoose.connection.on('disconnected', () => {
    dbState.setError(new Error('MongoDB disconnected'));
    logger.error('MongoDB disconnected');
  });

  mongoose.connection.on('error', (error) => {
    dbState.setError(error);
    logger.error('MongoDB connection error', error);
  });
};

const connectDB = async () => {
  try {
    bindConnectionListeners();

    const connection = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    dbState.setReady(true);
    logger.info(`MongoDB connected: ${connection.connection.host}`);

    return connection;
  } catch (error) {
    dbState.setError(error);
    throw error;
  }
};

module.exports = connectDB;
