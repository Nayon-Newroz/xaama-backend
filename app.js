var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
const conntectDB = require("./db/database");
// Routes Imports
var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var locationsRouter = require("./routes/locations");
var categoryRouter = require("./routes/category");
var filterRouter = require("./routes/filter");

const errorMiddleware = require("./middleware/error");
// Database connection

conntectDB();

var app = express();

var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];
var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());
// app.use(cors(corsOptions));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/api/v1/users", usersRouter);
app.use("/api/v1/product", productsRouter);
app.use("/api/v1/location", locationsRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/filter", filterRouter);

// catch 404 and forward to error handler
app.use(errorMiddleware);
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
