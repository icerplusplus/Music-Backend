import FavoritePlaylists from "../models/FavoritePlaylists";

export const favoriteController = {
  getFavoritePlaylistByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const favorites = await FavoritePlaylists.findOne({ _id: id });
      if (!favorites) {
        return res.status(200).json({
          data: "",
          message: "No favorite list!",
          status: 404,
        });
      }
      return res.status(200).json({
        data: favorites,
        message: "Get favorite successful!",
        status: 200,
      });
    } catch (error) {
      return res.status(200).json({
        data: "",
        message: "Get favorite data failed!",
        status: 500,
      });
    }
  },

  // TODO: create new favorite playlist with user id = 64213d45a4bff7483a2fad2f
  createNewFavoritePlaylist: async (req, res) => {
    try {
      const userId = req.body.id;
      const favoriteNameExist = await FavoritePlaylists.findOne({
        userId: req.body.id,
        title: req.body.title,
      });

      if (favoriteNameExist) {
        return res.status(200).json({
          data: "",
          message: "Favorite title exist in system!",
          status: 403,
        });
      }
      const newFavoritePlaylist = new FavoritePlaylists({
        userId: userId,
        title: req.body.title,
      });
      const newPlaylist = await newFavoritePlaylist.save();

      return res.status(200).json({
        data: newPlaylist,
        message: "Create new favorite playlist successful!",
        status: 200,
      });
    } catch (error) {
      return res.status(200).json({
        data: "",
        message: "Create new favorite playlist data failed!",
        status: 500,
      });
    }
  },

  // TODO: add song to favorite playlist with favorite playlist id
  addSongsToFavoritePlaylist: async (req, res) => {
    try {
      const favoriteId = req.body.id;

      FavoritePlaylists.findByIdAndUpdate(
        favoriteId,
        {
          $set: {
            songs: req.body.songs,
          },
        },
        { new: true }
      ).then((playlist) => {
        console.log("Songs is added");
        return res.status(200).json({
          data: playlist,
          message: "Create new favorite playlist successful!",
          status: 200,
        });
      });
    } catch (error) {
      return res.status(200).json({
        data: "",
        message: "Add new songs to favorite playlist data failed!",
        status: 500,
      });
    }
  },
};
