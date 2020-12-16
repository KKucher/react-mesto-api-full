const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { ERROR_CODE_404, errorMessage404 } = require("./utils/errors");

const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "5fb95393c58daaa25a18ec4c",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("/*", (req, res) => {
  res.status(ERROR_CODE_404).send({ message: errorMessage404 });
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
