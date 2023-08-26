class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  updateUser(name, email) {
    return fetch(`${this._url}/us1ers/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email
      }),
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  saveMovie(movieData) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(movieData)
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  deleteSavedMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }
};

const mainApi = new MainApi({ url: 'http://localhost:4000' });

export default mainApi;