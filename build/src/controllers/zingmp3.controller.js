"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zingmp3Controller = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _zingmp3ApiFullV = require("zingmp3-api-full-v3");
var zingmp3Controller = {
  getSong: function () {
    var _getSong = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getSong(req.params.id).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getSong(_x, _x2) {
      return _getSong.apply(this, arguments);
    }
    return getSong;
  }(),
  getDetailPlaylist: function () {
    var _getDetailPlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getDetailPlaylist(req.params.id).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getDetailPlaylist(_x3, _x4) {
      return _getDetailPlaylist.apply(this, arguments);
    }
    return getDetailPlaylist;
  }(),
  getHome: function () {
    var _getHome = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getHome().then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function getHome(_x5, _x6) {
      return _getHome.apply(this, arguments);
    }
    return getHome;
  }(),
  getTop100: function () {
    var _getTop = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getTop100().then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function getTop100(_x7, _x8) {
      return _getTop.apply(this, arguments);
    }
    return getTop100;
  }(),
  getChartHome: function () {
    var _getChartHome = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getChartHome().then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    function getChartHome(_x9, _x10) {
      return _getChartHome.apply(this, arguments);
    }
    return getChartHome;
  }(),
  getNewReleaseChart: function () {
    var _getNewReleaseChart = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getNewReleaseChart().then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function getNewReleaseChart(_x11, _x12) {
      return _getNewReleaseChart.apply(this, arguments);
    }
    return getNewReleaseChart;
  }(),
  getInfo: function () {
    var _getInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getInfoSong(req.query.id).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function getInfo(_x13, _x14) {
      return _getInfo.apply(this, arguments);
    }
    return getInfo;
  }(),
  getArtist: function () {
    var _getArtist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getArtist(req.query.name).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function getArtist(_x15, _x16) {
      return _getArtist.apply(this, arguments);
    }
    return getArtist;
  }(),
  getArtistSong: function () {
    var _getArtistSong = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getListArtistSong(req.query.id, req.query.page, req.query.count).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    function getArtistSong(_x17, _x18) {
      return _getArtistSong.apply(this, arguments);
    }
    return getArtistSong;
  }(),
  getArtistPlaylist: function () {
    var _getArtistPlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getListArtistPlaylist(req.query.id, req.query.page, req.query.count).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    function getArtistPlaylist(_x19, _x20) {
      return _getArtistPlaylist.apply(this, arguments);
    }
    return getArtistPlaylist;
  }(),
  getLyric: function () {
    var _getLyric = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getLyric(req.params.id).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    function getLyric(_x21, _x22) {
      return _getLyric.apply(this, arguments);
    }
    return getLyric;
  }(),
  search: function () {
    var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.search(req.query.keyword).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }));
    function search(_x23, _x24) {
      return _search.apply(this, arguments);
    }
    return search;
  }(),
  suggestions: function () {
    var _suggestions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.Suggest().then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }));
    function suggestions(_x25, _x26) {
      return _suggestions.apply(this, arguments);
    }
    return suggestions;
  }(),
  getListMV: function () {
    var _getListMV = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getListMV(req.query.id, req.query.page, req.query.count).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }));
    function getListMV(_x27, _x28) {
      return _getListMV.apply(this, arguments);
    }
    return getListMV;
  }(),
  getCategoryMV: function () {
    var _getCategoryMV = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getCategoryMV(req.query.id).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }));
    function getCategoryMV(_x29, _x30) {
      return _getCategoryMV.apply(this, arguments);
    }
    return getCategoryMV;
  }(),
  getVideo: function () {
    var _getVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _zingmp3ApiFullV.ZingMp3.getVideo(req.query.id).then(function (data) {
              res.json(data);
            });
          case 1:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    }));
    function getVideo(_x31, _x32) {
      return _getVideo.apply(this, arguments);
    }
    return getVideo;
  }()
};
exports.zingmp3Controller = zingmp3Controller;