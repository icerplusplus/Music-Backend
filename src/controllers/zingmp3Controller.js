import { ZingMp3 } from "zingmp3-api-full";
// import { ZingMp3Search } from "../utils/libraries/zingSearch";

export const zingmp3Controller = {
  getSong: async (req, res) => {
    ZingMp3.getSong(req.params.id).then((data) => {
      res.json(data);
    });
  },

  getDetailPlaylist: async (req, res) => {
    ZingMp3.getDetailPlaylist(req.params.id).then((data) => {
      res.json(data);
    });
  },

  getHome: async (req, res) => {
    ZingMp3.getHome().then((data) => {
      res.json(data);
    });
  },

  getTop100: async (req, res) => {
    ZingMp3.getTop100().then((data) => {
      res.json(data);
    });
  },

  getTopArtists: async (req, res) => {
    ZingMp3.getArtistList().then((rs) => {
      const { data } = rs;
      const artists = data.sections.find(
        (item) => item.sectionType === "artist"
      );
      res.json({ data: artists });
    });
  },

  getChartHome: async (req, res) => {
    ZingMp3.getChartHome().then((data) => {
      res.json(data);
    });
  },

  getNewReleaseChart: async (req, res) => {
    ZingMp3.getNewReleaseChart().then((data) => {
      res.json(data);
    });
  },

  getInfo: async (req, res) => {
    ZingMp3.getInfoSong(req.query.id).then((data) => {
      res.json(data);
    });
  },

  getArtist: async (req, res) => {
    ZingMp3.getArtist(req.query.name).then((data) => {
      res.json(data);
    });
  },

  getArtistSong: async (req, res) => {
    ZingMp3.getSearchAll(req.query.name, req.query.page, req.query.count).then(
      (data) => {
        res.json(data);
      }
    );
  },
  getArtistPlaylist: async (req, res) => {
    ZingMp3.getSearchAllPlaylist(
      req.query.name,
      req.query.page,
      req.query.count
    ).then((data) => {
      res.json(data);
    });
  },

  getLyric: async (req, res) => {
    ZingMp3.getLyric(req.params.id).then((data) => {
      res.json(data);
    });
  },

  search: async (req, res) => {
    ZingMp3.search(req.query.keyword).then((data) => {
      res.json(data);
    });
  },

  suggestions: async (req, res) => {
    ZingMp3.Suggest().then((data) => {
      res.json(data);
    });
  },

  getListMV: async (req, res) => {
    ZingMp3.getListMV(req.query.id, req.query.page, req.query.count).then(
      (data) => {
        res.json(data);
      }
    );
  },

  getCategoryMV: async (req, res) => {
    ZingMp3.getCategoryMV(req.query.id).then((data) => {
      res.json(data);
    });
  },

  getVideo: async (req, res) => {
    ZingMp3.getVideo(req.query.id).then((data) => {
      res.json(data);
    });
  },
};
