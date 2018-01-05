function AlreadyClockedInError(message) {
  const error = new Error(message);
  error.name = 'AlreadyClockedInError';
  return error;
}

function AlreadyClockedOutError(message) {
  const error = new Error(message);
  error.name = 'AlreadyClockedInError';
  return error;
}

module.exports = {
  AlreadyClockedInError,
  AlreadyClockedOutError
}
