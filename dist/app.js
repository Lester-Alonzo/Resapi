"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _tasksroutes = _interopRequireDefault(require("./routes/tasksroutes"));

var app = (0, _express["default"])(); //setings

app.set('port', process.env.PORT || 3001); //middleswares

var corsOptions = {};
app.use((0, _cors["default"])(corsOptions));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // routes

app.get("/", function (req, res) {
  res.json({
    message: 'wrlcome to my app'
  });
});
app.use('/api/tasks', _tasksroutes["default"]);
var _default = app;
exports["default"] = _default;