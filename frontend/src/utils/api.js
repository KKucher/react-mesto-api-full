/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */

import { apiOptions } from "./utils";


const checkError = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-Type"];
  }

  //***************************************************************************
  // Загрузка информации о пользователе с сервера:

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": `${this._contentType}`,
      },
    }).then(checkError);
  }

  //***************************************************************************
  // Загрузка карточек с сервера:

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": `${this._contentType}`,
      },
    }).then(checkError);
  }

  //***************************************************************************
  // Редактирование профиля:

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(checkError);
  }

  //***************************************************************************
  // Добавление новой карточки:

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(checkError);
  }

  //***************************************************************************
  // Добавление/удаление лайка:

  changeLikeDislikeStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
    }).then(checkError);
  }

  //***************************************************************************
  // Удаление карточки:

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
    }).then(checkError);
  }

  //***************************************************************************
  // Обновление аватара пользователя:

  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    }).then(checkError);
  }
}

const api = new Api(apiOptions);
export default api;