"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var tokenSchema = new _mongoose["default"].Schema({
  accessToken: {
    type: "string"
  },
  refreshToken: {
    type: "string"
  },
  expiresIn: {
    type: "string"
  },
  expiresAt: {
    type: "string"
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model("Token", tokenSchema);
exports["default"] = _default;