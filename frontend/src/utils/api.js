/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */

import { apiOptions } from "./utils";


const handleOriginalResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

class Api {
  constructor(options) {
    this._token = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-Type"];
  }

  //***************************************************************************
  // Загрузка информации о пользователе с сервера:

  getUserInfo() {
    return fetch(`${this._token}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    }).then(handleOriginalResponse);
  }

  //***************************************************************************
  // Загрузка карточек с сервера:

  getInitialCards() {
    return fetch(`${this._token}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    }).then(handleOriginalResponse);
  }

  //***************************************************************************
  // Редактирование профиля:

  editProfile({ name, about }) {
    return fetch(`${this._token}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(handleOriginalResponse);
  }

  //***************************************************************************
  // Добавление новой карточки:

  addNewCard({ name, link }) {
    return fetch(`${this._token}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(handleOriginalResponse);
  }

  //***************************************************************************
  // Добавление/удаление лайка:

  changeLikeDislikeStatus(cardId, isLiked) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(handleOriginalResponse);
  }

  //***************************************************************************
  // Удаление карточки:

  deleteCard(cardId) {
    return fetch(`${this._token}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(handleOriginalResponse);
  }

  //***************************************************************************
  // Обновление аватара пользователя:

  editAvatar({ avatar }) {
    return fetch(`${this._token}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    }).then(handleOriginalResponse);
  }
}

const api = new Api(apiOptions);
export default api;