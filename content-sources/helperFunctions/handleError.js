/* eslint-disable no-console */
const handleError = (error, customMessage) => {
  // throw error;
  const customError = new Error();
  customError.status = 500;
  customError.code = "Unhandled Error";
  // forward available Error information while obscuring sensitive data
  try {
    const {
      message,
      code,
      stack,
      response,
      location = null,
      statusCode,
    } = error;
    const { status } = response;
    customError.statusCode = statusCode;
    customError.location = location;
    customError.status = status;
    customError.code = code;
    customError.message = `${code} - ${message}. \n ${stack}`;
  } catch (err) {
    // don't do anything
  }
  console.error(customError);

  if (customMessage) {
    console.error(customMessage);
  }

  throw customError;
};

export default handleError;
