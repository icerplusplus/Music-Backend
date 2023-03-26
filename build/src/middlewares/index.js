"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var middleWare = {
  // VERIFY TOKEN
  verifyToken: function verifyToken(req, res, next) {
    var token = req.headers.token;
    if (token) {
      var accessToken = token.split(" ")[1];
      _jsonwebtoken["default"].verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
        if (err) {
          // 403 - Forbidden
          return res.status(403).json({
            message: "Token is not valid"
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        message: "You're not authenticated"
      });
    }
  },
  verifyTokenAndAdmin: function verifyTokenAndAdmin(req, res, next) {
    middleWare.verifyToken(req, res, function () {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          message: "You're not allowed to access this roles"
        });
      }
    });
  },
  verifyTokenAndAuthorization: function verifyTokenAndAuthorization(req, res, next) {
    middleWare.verifyToken(req, res, function () {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          message: "You're not allowed to do that!"
        });
      }
    });
  }
};
var _default = middleWare;
exports["default"] = _default;