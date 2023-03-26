"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRefreshToken = exports.generateAccessToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var generateAccessToken = function generateAccessToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user._id,
    isAdmin: user.isAdmin
  }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "5d"
  });
};
exports.generateAccessToken = generateAccessToken;
var generateRefreshToken = function generateRefreshToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user._id,
    isAdmin: user.isAdmin
  }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "30d"
  });
};
exports.generateRefreshToken = generateRefreshToken;