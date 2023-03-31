"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _auth = require("./auth.controller");
Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _auth[key];
    }
  });
});
var _favorite = require("./favorite.controller");
Object.keys(_favorite).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _favorite[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _favorite[key];
    }
  });
});
var _zingmp = require("./zingmp3.controller");
Object.keys(_zingmp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _zingmp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _zingmp[key];
    }
  });
});
var _user = require("./user.controller");
Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _user[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _user[key];
    }
  });
});