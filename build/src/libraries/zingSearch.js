"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZingMp3Search = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _axios = _interopRequireDefault(require("axios"));
var _crypto = _interopRequireDefault(require("crypto"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ZingMp3SearchApi = /*#__PURE__*/function () {
  //   public VERSION;
  //   public URL;
  //   public SECRET_KEY;
  //   public API_KEY;
  //   public CTIME;

  function ZingMp3SearchApi(VERSION, URL, SECRET_KEY, API_KEY, CTIME) {
    (0, _classCallCheck2["default"])(this, ZingMp3SearchApi);
    this.VERSION = VERSION;
    this.URL = URL;
    this.SECRET_KEY = SECRET_KEY;
    this.API_KEY = API_KEY;
    this.CTIME = CTIME;
  }

  // private
  (0, _createClass2["default"])(ZingMp3SearchApi, [{
    key: "getHash256",
    value: function getHash256(str) {
      return _crypto["default"].createHash("sha256").update(str).digest("hex");
    }

    // private
  }, {
    key: "getHmac512",
    value: function getHmac512(str, key) {
      var hmac = _crypto["default"].createHmac("sha512", key);
      return hmac.update(Buffer.from(str, "utf8")).digest("hex");
    }

    // private
  }, {
    key: "hashParamNoId",
    value: function hashParamNoId(path) {
      return this.getHmac512(path + this.getHash256("ctime=".concat(this.CTIME, "version=").concat(this.VERSION)), this.SECRET_KEY);
    }

    // private
  }, {
    key: "hashParam",
    value: function hashParam(path, id) {
      return this.getHmac512(path + this.getHash256("ctime=".concat(this.CTIME, "id=").concat(id, "version=").concat(this.VERSION)), this.SECRET_KEY);
    }
    // private
  }, {
    key: "hashParamHome",
    value: function hashParamHome(path) {
      return this.getHmac512(path + this.getHash256("count=30ctime=".concat(this.CTIME, "page=1version=").concat(this.VERSION)), this.SECRET_KEY);
    }
    // private
  }, {
    key: "hashCategoryMV",
    value: function hashCategoryMV(path, id, type) {
      return this.getHmac512(path + this.getHash256("ctime=".concat(this.CTIME, "id=").concat(id, "type=").concat(type, "version=").concat(this.VERSION)), this.SECRET_KEY);
    }
    // private
  }, {
    key: "hashListMV",
    value: function hashListMV(path, id, type, page, count) {
      return this.getHmac512(path + this.getHash256("count=".concat(count, "ctime=").concat(this.CTIME, "id=").concat(id, "page=").concat(page, "type=").concat(type, "version=").concat(this.VERSION)), this.SECRET_KEY);
    }
    // private
  }, {
    key: "getCookie",
    value: function getCookie() {
      var _this = this;
      return new Promise(function (resolve, rejects) {
        _axios["default"].get("".concat(_this.URL)).then(function (res) {
          // TODO: Skip Error Object is possibly 'undefined'
          if (res.headers["set-cookie"]) {
            res.headers["set-cookie"].map(function (element, index) {
              if (index === 1) resolve(element); // return cookie
            });
          }
        })["catch"](function (err) {
          rejects(err); // return error value if any
        });
      });
    }
    // private
  }, {
    key: "requestZingMp3",
    value: function requestZingMp3(path, qs) {
      var _this2 = this;
      return new Promise(function (resolve, rejects) {
        // Config axios request default URL "https://zingmp3.vn"
        var client = _axios["default"].create({
          baseURL: "".concat(_this2.URL)
        });
        client.interceptors.response.use(function (res) {
          return res.data;
        }); // setting axios response data

        _this2.getCookie().then(function (cookie) {
          // request
          client.get(path, {
            headers: {
              Cookie: "".concat(cookie)
            },
            params: _objectSpread(_objectSpread({}, qs), {}, {
              ctime: _this2.CTIME,
              version: _this2.VERSION,
              apiKey: _this2.API_KEY
            })
          }).then(function (res) {
            resolve(res);
          })["catch"](function (err) {
            rejects(err);
          });
        })["catch"](function (err) {
          console.log(err);
        });
      });
    }

    // getSong
    // public
  }, {
    key: "getSong",
    value: function getSong(songId) {
      var _this3 = this;
      return new Promise(function (resolve, rejects) {
        _this3.requestZingMp3("/api/v2/song/get/streaming", {
          id: songId,
          sig: _this3.hashParam("/api/v2/song/get/streaming", songId)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getDetailPlaylist
    // public
  }, {
    key: "getDetailPlaylist",
    value: function getDetailPlaylist(playlistId) {
      var _this4 = this;
      return new Promise(function (resolve, rejects) {
        _this4.requestZingMp3("/api/v2/page/get/playlist", {
          id: playlistId,
          sig: _this4.hashParam("/api/v2/page/get/playlist", playlistId)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getHome
    // public
  }, {
    key: "getHome",
    value: function getHome() {
      var _this5 = this;
      return new Promise(function (resolve, rejects) {
        _this5.requestZingMp3("/api/v2/page/get/home", {
          page: 1,
          segmentId: "-1",
          count: "30",
          sig: _this5.hashParamHome("/api/v2/page/get/home")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getTop100
    // public
  }, {
    key: "getTop100",
    value: function getTop100() {
      var _this6 = this;
      return new Promise(function (resolve, rejects) {
        _this6.requestZingMp3("/api/v2/page/get/top-100", {
          sig: _this6.hashParamNoId("/api/v2/page/get/top-100")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getChartHome
    // public
  }, {
    key: "getChartHome",
    value: function getChartHome() {
      var _this7 = this;
      return new Promise(function (resolve, rejects) {
        _this7.requestZingMp3("/api/v2/page/get/chart-home", {
          sig: _this7.hashParamNoId("/api/v2/page/get/chart-home")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getNewReleaseChart
    // public
  }, {
    key: "getNewReleaseChart",
    value: function getNewReleaseChart() {
      var _this8 = this;
      return new Promise(function (resolve, rejects) {
        _this8.requestZingMp3("/api/v2/page/get/newrelease-chart", {
          sig: _this8.hashParamNoId("/api/v2/page/get/newrelease-chart")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getInfoSong
    // public
  }, {
    key: "getInfoSong",
    value: function getInfoSong(songId) {
      var _this9 = this;
      return new Promise(function (resolve, rejects) {
        _this9.requestZingMp3("/api/v2/song/get/info", {
          id: songId,
          sig: _this9.hashParam("/api/v2/song/get/info", songId)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // public
  }, {
    key: "getListArtistSong",
    value: function getListArtistSong(artistId, page, count) {
      var _this10 = this;
      return new Promise(function (resolve, rejects) {
        _this10.requestZingMp3("/api/v2/song/get/list", {
          id: artistId,
          type: "artist",
          page: page,
          count: count,
          sort: "new",
          sectionId: "aSong",
          sig: _this10.hashListMV("/api/v2/song/get/list", artistId, "artist", page, count)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getArtist
    // public
  }, {
    key: "getArtist",
    value: function getArtist(name) {
      var _this11 = this;
      return new Promise(function (resolve, rejects) {
        _this11.requestZingMp3("/api/v2/page/get/artist", {
          alias: name,
          sig: _this11.hashParamNoId("/api/v2/page/get/artist")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getLyric
    // public
  }, {
    key: "getLyric",
    value: function getLyric(songId) {
      var _this12 = this;
      return new Promise(function (resolve, rejects) {
        _this12.requestZingMp3("/api/v2/lyric/get/lyric", {
          id: songId,
          sig: _this12.hashParam("/api/v2/lyric/get/lyric", songId)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // search
    // public
  }, {
    key: "search",
    value: function search(name) {
      var _this13 = this;
      return new Promise(function (resolve, rejects) {
        _this13.requestZingMp3("/api/v2/search/multi", {
          q: name,
          sig: _this13.hashParamNoId("/api/v2/search/multi")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getListMV
    // public
  }, {
    key: "getListMV",
    value: function getListMV(id, page, count) {
      var _this14 = this;
      return new Promise(function (resolve, rejects) {
        _this14.requestZingMp3("/api/v2/video/get/list", {
          id: id,
          type: "genre",
          page: page,
          count: count,
          sort: "listen",
          sig: _this14.hashListMV("/api/v2/video/get/list", id, "genre", page, count)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getCategoryMV
    // public
  }, {
    key: "getCategoryMV",
    value: function getCategoryMV(id) {
      var _this15 = this;
      return new Promise(function (resolve, rejects) {
        _this15.requestZingMp3("/api/v2/genre/get/info", {
          id: id,
          type: "video",
          sig: _this15.hashCategoryMV("/api/v2/genre/get/info", id, "video")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getVideo
    // public
  }, {
    key: "getVideo",
    value: function getVideo(videoId) {
      var _this16 = this;
      return new Promise(function (resolve, rejects) {
        _this16.requestZingMp3("/api/v2/page/get/video", {
          id: videoId,
          sig: _this16.hashParam("/api/v2/page/get/video", videoId)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getArtistList
    // public
  }, {
    key: "getArtistList",
    value: function getArtistList() {
      var _this17 = this;
      return new Promise(function (resolve, rejects) {
        _this17.requestZingMp3("/api/v2/page/get/hub-detail", {
          id: "IWZ9Z087",
          sig: _this17.hashParam("/api/v2/page/get/hub-detail", "IWZ9Z087")
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }

    // getSuggestions
    // public
  }, {
    key: "getSuggestions",
    value: function getSuggestions(keyword) {
      var _this18 = this;
      return new Promise(function (resolve, rejects) {
        _this18.requestZingMp3("/v1/web/ac-suggestions", {
          num: 10,
          query: keyword,
          sig: _this18.getHmac512("/v1/web/ac-suggestions" + _this18.getHash256("num=10query=".concat(keyword, "ctime=").concat(_this18.CTIME, "version=").concat(_this18.VERSION)), _this18.SECRET_KEY)
        }).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          rejects(err);
        });
      });
    }
  }]);
  return ZingMp3SearchApi;
}(); // END
// instance default
var ZingMp3Search = new ZingMp3SearchApi("1.9.9",
// VERSION 1.6.34
"https://ac.zingmp3.vn",
// URL
"2aa2d1c561e809b267f3638c4a307aab",
// SECRET_KEY
"88265e23d4284f25963e6eedac8fbfa3",
// API_KEY 88265e23d4284f25963e6eedac8fbfa3
String(Math.floor(Date.now() / 1000)) // CTIME
);

// X5BM3w8N7MKozC0B85o4KMlzLZKhV00y

// https://zingmp3.vn/api/v2/page/get/hub-detail?id=IWZ9Z087&ctime=&version=1.9.9&sig=&apiKey=
exports.ZingMp3Search = ZingMp3Search;