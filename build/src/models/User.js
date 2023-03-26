"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: "string",
    required: true,
    minlength: 5,
    maxlength: 30
  },
  email: {
    type: "string",
    required: true,
    maxlength: 50,
    unique: true
  },
  password: {
    type: "string",
    required: true,
    maxlength: 255
  },
  isAdmin: {
    type: "boolean",
    "default": false
  },
  accessToken: {
    type: "string"
  },
  refreshToken: {
    type: "string"
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model("User", userSchema);
exports["default"] = _default;