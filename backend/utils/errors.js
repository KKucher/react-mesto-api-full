const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

const errorMessage400 = "ERROR_400 — переданы некорректные данные";
const errorMessage404 = "ERROR_404 — запрашиваемый ресурс не найден";
const errorMessage500 = "ERROR_500 — на сервере произошла ошибка";

const checkError = (res, err) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    res.status(ERROR_CODE_400).send({ message: errorMessage400 });
  } else if (err.message === "notValidId") {
    res.status(ERROR_CODE_404).send({ message: errorMessage404 });
  } else {
    res.status(ERROR_CODE_500).send({ message: errorMessage500 });
  }
};

module.exports = { ERROR_CODE_404, errorMessage404, checkError };
