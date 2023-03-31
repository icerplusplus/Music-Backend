"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _constant = require("../utils/constant");
var songSchema = new _mongoose["default"].Schema({
  encodeId: {
    type: "string",
    required: true
  },
  title: {
    type: "string"
  },
  alias: {
    type: "string"
  },
  artistsNames: {
    type: "string"
  },
  thumbnailM: {
    type: "string",
    "default": _constant.defaultSongThumb
  },
  duration: {
    type: "number"
  },
  isLocal: {
    type: "boolean",
    "default": true
  },
  audioUrl: {
    type: "string"
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model("Song", songSchema);
exports["default"] = _default;