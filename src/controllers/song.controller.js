import { hashPassword } from "../libraries/hashPassword.js";
import Song from "../models/Song.js";

import { defaultAvatar } from "../utils/constant.js";

export const songController = {
  // REGISTER
  all: async (req, res) => {
    try {
      const size = Number(req.query.size);
      const page = Number(req.query.page);
      const skipNumber = size * (page - 1);
      const total = await Song.find({});
      const songs = await Song.find({}).skip(skipNumber).limit(size);

      if (!songs) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No user found!" });
      }

      return res.status(200).json({
        data: songs,
        total: total.length,
        page: page,
        status: 200,
        message: "Get songs data successful",
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },
  // GET DETAIL SONGS
  getSongById: async (req, res) => {
    try {
      const song = await Song.findOne({ _id: req.params.id });

      if (!song) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No song found!" });
      }

      return res.status(200).json({
        data: song,
        status: 200,
        message: "Get song data successful",
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },

  // UPDATE SONG INFO
  updateSongById: async (req, res) => {
    try {
      const songId = req.body.id;

      const song = await Song.findOne({ _id: songId });

      if (!song) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No song found!" });
      }

      // find song and update
      Song.findByIdAndUpdate(
        songId,
        {
          $set: {
            title: req.body.title,
            alias: req.body.alias,
            artistsNames: req.body.artistsNames,
            duration: req.body.duration,
            thumbnailM: req.body.thumbnailM,
            audioUrl: req.body.audioUrl,
          },
        },
        { new: true }
      ).then((song) => {
        return res.status(200).json({
          data: song,
          status: 200,
          message: "Song info is updated",
        });
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },

  // DELETE SONG BY ID
  removeSongById: async (req, res) => {
    try {
      const songId = req.params.id;
      const song = await Song.findOne({ _id: songId });

      if (!song) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No song found!" });
      }

      Song.findByIdAndDelete({ _id: songId }).then((data) => {
        return res.status(200).json({
          data: "",
          status: 200,
          message: "Song data is removed",
        });
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },

  // CREATE SONG
  create: async (req, res) => {
    try {
      const newSong = new Song({
        title: req.body.title,
        alias: req.body.alias,
        artistsNames: req.body.artistsNames,
        duration: req.body.duration,
        thumbnailM: req.body.thumbnailM,
        audioUrl: req.body.audioUrl,
      });
      const rs = newSong.save();
      return res.status(200).json({
        data: rs._doc,
        status: 200,
        message: "Create song successful!",
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },
};
