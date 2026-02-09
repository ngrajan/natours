/* eslint-disable */
require('@babel/polyfill');
const displayMap = require('./mapBox');
const { login, logout } = require('./auth');
// DOM Elements
const isMap = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

// Delegation
if (isMap) {
  const locations = JSON.parse(isMap.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);
