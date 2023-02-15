"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJSON = toJSON;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
function toJSON(obj) {
  var processed = new WeakMap();
  if (processed.has(obj)) {
    return;
  }
  var json = {};
  processed.set(obj, true);
  for (var key in obj) {
    var value = obj[key];
    if ((0, _typeof2["default"])(value) === "object") {
      value = toJSON(value);
    }
    json[key] = value;
  }
  return json;
}