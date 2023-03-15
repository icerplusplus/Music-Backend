import axios from "axios";
import crypto from "crypto";

class ZingMp3SearchApi {
  //   public VERSION;
  //   public URL;
  //   public SECRET_KEY;
  //   public API_KEY;
  //   public CTIME;

  constructor(VERSION, URL, SECRET_KEY, API_KEY, CTIME) {
    this.VERSION = VERSION;
    this.URL = URL;
    this.SECRET_KEY = SECRET_KEY;
    this.API_KEY = API_KEY;
    this.CTIME = CTIME;
  }

  // private
  getHash256(str) {
    return crypto.createHash("sha256").update(str).digest("hex");
  }

  // private
  getHmac512(str, key) {
    let hmac = crypto.createHmac("sha512", key);
    return hmac.update(Buffer.from(str, "utf8")).digest("hex");
  }

  // private
  hashParamNoId(path) {
    return this.getHmac512(
      path + this.getHash256(`ctime=${this.CTIME}version=${this.VERSION}`),
      this.SECRET_KEY
    );
  }

  // private
  hashParam(path, id) {
    return this.getHmac512(
      path +
        this.getHash256(`ctime=${this.CTIME}id=${id}version=${this.VERSION}`),
      this.SECRET_KEY
    );
  }
  // private
  hashParamHome(path) {
    return this.getHmac512(
      path +
        this.getHash256(
          `count=30ctime=${this.CTIME}page=1version=${this.VERSION}`
        ),
      this.SECRET_KEY
    );
  }
  // private
  hashCategoryMV(path, id, type) {
    return this.getHmac512(
      path +
        this.getHash256(
          `ctime=${this.CTIME}id=${id}type=${type}version=${this.VERSION}`
        ),
      this.SECRET_KEY
    );
  }
  // private
  hashListMV(path, id, type, page, count) {
    return this.getHmac512(
      path +
        this.getHash256(
          `count=${count}ctime=${this.CTIME}id=${id}page=${page}type=${type}version=${this.VERSION}`
        ),
      this.SECRET_KEY
    );
  }
  // private
  getCookie() {
    return new Promise((resolve, rejects) => {
      axios
        .get(`${this.URL}`)
        .then((res) => {
          // TODO: Skip Error Object is possibly 'undefined'
          if (res.headers["set-cookie"]) {
            res.headers["set-cookie"].map((element, index) => {
              if (index === 1) resolve(element); // return cookie
            });
          }
        })
        .catch((err) => {
          rejects(err); // return error value if any
        });
    });
  }
  // private
  requestZingMp3(path, qs) {
    return new Promise((resolve, rejects) => {
      // Config axios request default URL "https://zingmp3.vn"
      const client = axios.create({
        baseURL: `${this.URL}`,
      });

      client.interceptors.response.use((res) => res.data); // setting axios response data

      this.getCookie()
        .then((cookie) => {
          // request
          client
            .get(path, {
              headers: {
                Cookie: `${cookie}`,
              },
              params: {
                ...qs,
                ctime: this.CTIME,
                version: this.VERSION,
                apiKey: this.API_KEY,
              },
            })
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              rejects(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  // getSong
  // public
  getSong(songId) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/song/get/streaming", {
        id: songId,
        sig: this.hashParam("/api/v2/song/get/streaming", songId),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getDetailPlaylist
  // public
  getDetailPlaylist(playlistId) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/playlist", {
        id: playlistId,
        sig: this.hashParam("/api/v2/page/get/playlist", playlistId),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getHome
  // public
  getHome() {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/home", {
        page: 1,
        segmentId: "-1",
        count: "30",
        sig: this.hashParamHome("/api/v2/page/get/home"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getTop100
  // public
  getTop100() {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/top-100", {
        sig: this.hashParamNoId("/api/v2/page/get/top-100"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getChartHome
  // public
  getChartHome() {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/chart-home", {
        sig: this.hashParamNoId("/api/v2/page/get/chart-home"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getNewReleaseChart
  // public
  getNewReleaseChart() {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/newrelease-chart", {
        sig: this.hashParamNoId("/api/v2/page/get/newrelease-chart"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getInfoSong
  // public
  getInfoSong(songId) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/song/get/info", {
        id: songId,
        sig: this.hashParam("/api/v2/song/get/info", songId),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // public
  getListArtistSong(artistId, page, count) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/song/get/list", {
        id: artistId,
        type: "artist",
        page: page,
        count: count,
        sort: "new",
        sectionId: "aSong",
        sig: this.hashListMV(
          "/api/v2/song/get/list",
          artistId,
          "artist",
          page,
          count
        ),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getArtist
  // public
  getArtist(name) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/artist", {
        alias: name,
        sig: this.hashParamNoId("/api/v2/page/get/artist"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getLyric
  // public
  getLyric(songId) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/lyric/get/lyric", {
        id: songId,
        sig: this.hashParam("/api/v2/lyric/get/lyric", songId),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // search
  // public
  search(name) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/search/multi", {
        q: name,
        sig: this.hashParamNoId("/api/v2/search/multi"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getListMV
  // public
  getListMV(id, page, count) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/video/get/list", {
        id: id,
        type: "genre",
        page: page,
        count: count,
        sort: "listen",
        sig: this.hashListMV(
          "/api/v2/video/get/list",
          id,
          "genre",
          page,
          count
        ),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getCategoryMV
  // public
  getCategoryMV(id) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/genre/get/info", {
        id: id,
        type: "video",
        sig: this.hashCategoryMV("/api/v2/genre/get/info", id, "video"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getVideo
  // public
  getVideo(videoId) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/video", {
        id: videoId,
        sig: this.hashParam("/api/v2/page/get/video", videoId),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getArtistList
  // public
  getArtistList() {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/api/v2/page/get/hub-detail", {
        id: "IWZ9Z087",
        sig: this.hashParam("/api/v2/page/get/hub-detail", "IWZ9Z087"),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  // getSuggestions
  // public
  getSuggestions(keyword) {
    return new Promise((resolve, rejects) => {
      this.requestZingMp3("/v1/web/ac-suggestions", {
        num: 10,
        query: keyword,
        sig: this.getHmac512(
          "/v1/web/ac-suggestions" +
            this.getHash256(
              `num=10query=${keyword}ctime=${this.CTIME}version=${this.VERSION}`
            ),
          this.SECRET_KEY
        ),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }
} // END

// instance default
export const ZingMp3Search = new ZingMp3SearchApi(
  "1.9.9", // VERSION 1.6.34
  "https://ac.zingmp3.vn", // URL
  "2aa2d1c561e809b267f3638c4a307aab", // SECRET_KEY
  "88265e23d4284f25963e6eedac8fbfa3", // API_KEY 88265e23d4284f25963e6eedac8fbfa3
  String(Math.floor(Date.now() / 1000)) // CTIME
);

// X5BM3w8N7MKozC0B85o4KMlzLZKhV00y

// https://zingmp3.vn/api/v2/page/get/hub-detail?id=IWZ9Z087&ctime=&version=1.9.9&sig=&apiKey=
