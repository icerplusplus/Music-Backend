"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _autoGenerateToken = require("./autoGenerateToken");
Object.keys(_autoGenerateToken).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _autoGenerateToken[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _autoGenerateToken[key];
    }
  });
});
var _hashPassword = require("./hashPassword");
Object.keys(_hashPassword).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hashPassword[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hashPassword[key];
    }
  });
});