"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongodbInstance = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
require("dotenv/config");
var mongodbInstance = function mongodbInstance() {
  // mongoose config
  _mongoose["default"].set("strictQuery", false);
  _mongoose["default"].connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    console.log("🚀 connected to mongodb");
  })["catch"](function (err) {
    console.log("🚀 connect to mongodb failed\n", err);
  });
};
exports.mongodbInstance = mongodbInstance;