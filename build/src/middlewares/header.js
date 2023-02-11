"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = void 0;
var header = {
  allowAll: function allowAll(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }
};
exports.header = header;