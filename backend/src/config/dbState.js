const state = {
  isReady: false,
  lastError: null,
};

const setReady = (value) => {
  state.isReady = value;

  if (value) {
    state.lastError = null;
  }
};

const setError = (error) => {
  state.isReady = false;
  state.lastError = error ? error.message || String(error) : 'Unknown database error';
};

const getState = () => ({
  isReady: state.isReady,
  lastError: state.lastError,
});

module.exports = {
  setReady,
  setError,
  getState,
};
