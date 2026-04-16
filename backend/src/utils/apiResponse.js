const sendResponse = (
  res,
  { statusCode = 200, success = true, message = '', data = {}, meta = undefined }
) =>
  res.status(statusCode).json({
    success,
    message,
    data,
    ...(meta ? { meta } : {}),
  });

const sendAuthResponse = (res, { statusCode = 200, message, token, user }) =>
  sendResponse(res, {
    statusCode,
    message,
    data: {
      token,
      user,
    },
  });

module.exports = {
  sendResponse,
  sendAuthResponse,
};
