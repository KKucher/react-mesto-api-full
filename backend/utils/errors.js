const bcrypt = require("bcryptjs");

const ERROR_CODE_400 = 400;
const ERROR_CODE_401 = 401;
const ERROR_CODE_403 = 403;
const ERROR_CODE_404 = 404;
const ERROR_CODE_409 = 409;
const ERROR_CODE_500 = 500;

const errorMessage400 = "ERROR_400 — переданы некорректные данные";
const errorMessage401 = "ERROR_401 — неправильные почта или пароль";
const errorMessageWithToken401 = "ERROR_401 — необходима авторизация";
const errorMessage403 = "ERROR_403 — недостаточно прав для совершения операции";
const errorMessage404 = "ERROR_404 — запрашиваемый ресурс не найден";
const errorMessageWithCard404 = "ERROR_404 — запрашиваемая карточка не найдена";
const errorMessageWithUser404 = "ERROR_404 — пользователь не найден";
const errorMessage409 = "ERROR_409 — данная электронная почта уже зарегистрирована";
const errorMessage500 = "ERROR_500 — на сервере произошла ошибка";

const checkError = (err, res) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    res
      .status(ERROR_CODE_400)
      .send({ message: errorMessage400, details: err.message });
  } else if (err.message === "notValidLogin") {
    res
      .status(ERROR_CODE_401)
      .send({ message: errorMessage401 });
  } else if (err.message === "JsonWebTokenError" || err.name === "JsonWebTokenError") {
    res
      .status(ERROR_CODE_401)
      .send({ message: errorMessageWithToken401 });
  } else if (err.message === "forbidden") {
    res
      .status(ERROR_CODE_403)
      .send({ message: errorMessage403 });
  } else if (err.message === "cardNotFound") {
    res
      .status(ERROR_CODE_404)
      .send({ message: errorMessageWithCard404 });
  } else if (err.message === "userNotFound") {
    res
      .status(ERROR_CODE_404)
      .send({ message: errorMessageWithUser404 });
  } else if (err.name === "MongoError" && err.message.startsWith("E11000")) {
    res
      .status(ERROR_CODE_409)
      .send({ message: errorMessage409 });
  } else {
    res
      .status(ERROR_CODE_500)
      .send({ message: errorMessage500, details: err.message });
  }
};

function cryptHash(password) {
  if (!password) {
    return Promise.reject(new Error("notValidLogin"));
  }
  return bcrypt.hash(password, 10);
}

const cryptCompare = (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return Promise.reject(new Error("notValidLogin"));
  }
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  ERROR_CODE_404,
  errorMessage404,
  checkError,
  cryptCompare,
  cryptHash,
};
