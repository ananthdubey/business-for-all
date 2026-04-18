const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');
const logger = require('./src/utils/logger');

const DB_RETRY_DELAY_MS = 5000;

const connectWithRetry = async () => {
  try {
    await connectDB();
  } catch (error) {
    logger.error(
      `MongoDB connection failed. Retrying in ${DB_RETRY_DELAY_MS / 1000} seconds.`,
      error
    );

    setTimeout(() => {
      connectWithRetry().catch((retryError) => {
        logger.error('Unexpected database retry failure', retryError);
      });
    }, DB_RETRY_DELAY_MS);
  }
};

const startServer = async () => {
  app.listen(env.port, () => {
    logger.info(`Backend running on port ${env.port} in ${env.nodeEnv} mode`);
  });

  await connectWithRetry();
};

startServer().catch((error) => {
  logger.error('Failed to start backend server', error);
  process.exit(1);
});
