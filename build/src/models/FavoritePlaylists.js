"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var favoritePlaylistSchema = new _mongoose["default"].Schema({
  userId: {
    type: "string",
    required: true,
    maxlength: 255
  },
  title: {
    type: "string",
    required: true,
    maxlength: 30
  },
  songs: {
    type: "array",
    "default": []
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model("FavoritePlaylist", favoritePlaylistSchema);
exports["default"] = _default;