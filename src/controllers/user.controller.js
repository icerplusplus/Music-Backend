import { hashPassword } from "../libraries/hashPassword.js";
import User from "../models/User.js";
import { defaultAvatar } from "../utils/constant.js";

export const userController = {
  // REGISTER
  all: async (req, res) => {
    try {
      const size = Number(req.query.size);
      const page = Number(req.query.page);
      const skipNumber = size * (page - 1);
      const total = await User.find({});
      const users = await User.find({}).skip(skipNumber).limit(size);

      if (!users) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No user found!" });
      }

      return res.status(200).json({
        data: users,
        total: total.length,
        page: page,
        status: 200,
        message: "Get users data successful",
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },
  // GET DETAIL USER
  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No user found!" });
      }

      return res.status(200).json({
        data: user,
        status: 200,
        message: "Get user data successful",
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },

  // UPDATE USER INFO
  updateUserById: async (req, res) => {
    try {
      const userId = req.body.id;
      const userPassword = req.body.password;
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No user found!" });
      }

      let userInfo;

      if (!userPassword) {
        userInfo = {
          name: req.body.name,
          isAdmin: req.body.isAdmin,
          avatar: req.body?.avatar || user?.avatar || defaultAvatar,
          accessToken: "",
          refreshToken: "",
        };
      } else {
        const passwordHashed = await hashPassword(req.body.password);
        userInfo = {
          name: req.body.name,
          password: passwordHashed,
          isAdmin: req.body.isAdmin,
          avatar: req.body?.avatar || user?.avatar || defaultAvatar,
          accessToken: "",
          refreshToken: "",
        };
      }
      if (userInfo) {
        // find user and update
        User.findByIdAndUpdate(
          userId,
          {
            $set: userInfo,
          },
          { new: true }
        ).then((user) => {
          return res.status(200).json({
            data: user,
            status: 200,
            message: "User info is updated",
          });
        });
      }
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },

  // DELETE USER BY ID
  removeUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res
          .status(200)
          .json({ data: "", status: 404, message: "No user found!" });
      }

      User.findByIdAndDelete({ _id: userId }).then((data) => {
        return res.status(200).json({
          data: "",
          status: 200,
          message: "User data is removed",
        });
      });
    } catch (error) {
      return res.status(200).json({ data: "", status: 500, message: error });
    }
  },
};
