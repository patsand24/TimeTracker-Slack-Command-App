function UserNotFoundError(message) {
  const error = new Error();
  error.name = 'UserNotFoundError';
  error.message = message;
  return error;
}

function UserAlreadyExistsError(message) {
  const error = new Error();
  error.name = 'UserAlreadyExistsError';
  error.message = message;
  return error;
}

module.exports = {
  UserNotFoundError,
  UserAlreadyExistsError
}