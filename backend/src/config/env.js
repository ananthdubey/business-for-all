const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const fallbackConfig = {
  MONGO_URI: 'mongodb://127.0.0.1:27017/business-for-all',
  JWT_SECRET: 'local-dev-jwt-secret-change-me',
};

for (const [key, fallbackValue] of Object.entries(fallbackConfig)) {
  if (!process.env[key]) {
    if (isProduction) {
      throw new Error(`${key} is required in the environment configuration`);
    }

    process.env[key] = fallbackValue;
    console.warn(
      `[env] ${key} is not set. Using a development fallback. Add it to backend/.env for real usage.`
    );
  }
}

module.exports = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((item) => item.trim().replace(/\/$/, ''))
    .filter(Boolean),
  cookieName: process.env.COOKIE_NAME || 'business_for_all_token',
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM || 'Business for All <no-reply@businessforall.com>',
  supportEmail: process.env.SUPPORT_EMAIL || 'support@businessforall.com',
};
