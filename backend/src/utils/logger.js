const formatMessage = (level, message) =>
  `[${new Date().toISOString()}] [${level}] ${message}`;

const info = (message) => {
  console.log(formatMessage('INFO', message));
};

const error = (message, err) => {
  console.error(formatMessage('ERROR', message));
  if (err) {
    console.error(err);
  }
};

module.exports = {
  info,
  error,
};
