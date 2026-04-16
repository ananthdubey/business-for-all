const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');
const logger = require('./src/utils/logger');

const startServer = async () => {
  app.listen(env.port, () => {
    logger.info(`Backend running on port ${env.port} in ${env.nodeEnv} mode`);
  });

  try {
    await connectDB();
  } catch (error) {
    logger.error(
      'Backend started without a database connection. API endpoints that need MongoDB will return a 503 until the database is available.',
      error
    );
  }
};

startServer();
