"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
var _routes = _interopRequireDefault(require("./routes"));
var _mongodbInstance = require("./utils/mongodbInstance");
var _header = require("./middlewares/header");
var main = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var app;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // create and setup express app
          app = (0, _express["default"])(); // use middleware
          app.use((0, _cors["default"])());
          app.use(_express["default"].json());

          // routers
          app.use("/api", _header.header.allowAll, _routes["default"]);
          app.listen(process.env.PORT, function () {
            // connect to mongodb server
            (0, _mongodbInstance.mongodbInstance)();
            console.log("\uD83D\uDE80 CMsuicApi Server is running on port http://localhost:".concat(process.env.PORT, "/api ..."));
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function main() {
    return _ref.apply(this, arguments);
  };
}();
main()["catch"](function (err) {
  console.log(err);
});