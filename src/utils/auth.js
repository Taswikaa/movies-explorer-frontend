// const BASE_URL = 'https://api.yuwarika.nomoreparties.sbs';
const BASE_URL = 'http://localhost:4000';

const getResponseData = function(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
  })
  .then(response => {
    return getResponseData(response);
  })      
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })
  .then(response => {
    return response;
  })      
}

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then(response => {
    return response;
  })      
}

export const getLoggedUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  }) 
  .then(response => {
    return getResponseData(response);
  })
}