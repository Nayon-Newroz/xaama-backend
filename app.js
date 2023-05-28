var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const conntectDB = require("./db/database");
// Routes Imports
var indexRouter = require("./routes/index");
var userRouter = require("./routes/userRoute");
var productRouter = require("./routes/productRoute");
var locationRouter = require("./routes/locationRoute");
var categoryRouter = require("./routes/categoryRoute");
var filterRouter = require("./routes/filterRoute");
var orderRouter = require("./routes/orderRoute");
var roleRouter = require("./routes/roleRoute");
var permissionRouter = require("./routes/permissionRoute");

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
  credentials: true,
  // origin: function (origin, callback) {
  //   console.log("origin", origin);
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
};
// app.use(cors());

app.use(cors(corsOptions));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload({ useTempFiles: true }));
app.use("/", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/location", locationRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/filter", filterRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/permission", permissionRouter);

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
