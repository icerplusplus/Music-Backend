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
  thumbnail: {
    type: "string",
    "default": "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxubyUyMG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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