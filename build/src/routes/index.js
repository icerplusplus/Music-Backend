"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _musicController = _interopRequireDefault(require("../controllers/musicController"));
var router = _express["default"].Router();

// Main routers
router.get("/genres", _musicController["default"].getGenres);
router.get("/playlist", _musicController["default"].getPlaylist);
router.get("/track", _musicController["default"].getTrack);
var _default = router;
exports["default"] = _default;