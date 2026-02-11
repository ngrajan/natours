/* eslint-disable */
const axios = require('axios').default;
const showAlert = require('./alert');

const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:8000/api/v1/users/updateMyPassword'
        : 'http://localhost:8000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`,
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

module.exports = updateSettings;
