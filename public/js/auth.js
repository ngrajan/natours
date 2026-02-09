/* eslint-disable */
const axios = require('axios').default;
const showAlert = require('./alert');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged In successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logging Out!');
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', 'Error logging out! Try again.');
    console.error(error.response);
  }
};

module.exports = { login, logout };
