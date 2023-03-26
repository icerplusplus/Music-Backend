import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../libraries/autoGenerateToken";

let refreshTokens = [];

const authController = {
  // REGISTER
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
      });

      console.log("newUser: ", newUser);

      // Save to database after 5s
      const user = await newUser.save();
      const { isAdmin, password, ...filterInfo } = user._doc;
      setTimeout(async () => {
        return res.status(200).json(filterInfo);
      }, 5000);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  // LOGIN
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ message: "Wrong email!" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).json({ message: "Wrong password!" });
      }

      if (user && validPassword) {
        // use jsonwebtoken in here

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        // save refresh token to user account in db
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          },
          { new: true }
        ).then((user) => user);

        const { password, ...orders } = updatedUser._doc;
        setTimeout(async () => {
          return res.status(200).json({ ...orders, accessToken });
        }, 2000);
      }
    } catch (error) {
      console.log("Login failed", error);
      return res.status(500).json(error);
    }
  },
  // GET REFRESH TOKEN
  getRefreshToken: async (req, res) => {
    try {
      const refreshToken = req.headers.token.split(" ")[1];
      if (!refreshToken)
        return res.status(401).json({ message: "You're not authenticated" });

      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY,
        async (err, user) => {
          if (err) {
            return res
              .status(401)
              .json({ message: "Refresh Token is not valid" });
          }

          // Delete current refresh token have been logon
          // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

          // Create new access and refresh token
          const newAccessToken = await generateAccessToken(user);
          const newRefreshToken = await generateRefreshToken(user);

          // save refresh token to user account in db
          const updatedUser = await User.findByIdAndUpdate(
            user.id,
            {
              $set: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              },
            },
            { new: true }
          ).then((user) => user);

          // return access token to client
          const { password, ...orders } = updatedUser._doc;
          return res.status(200).json({ ...orders });
        }
      );
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // LOGOUT
  logout: async (req, res) => {
    // Clear refresh token from cookie
    // res.clearCookie("refreshToken");

    // delete refresh token in db
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          accessToken: "",
        },
      },
      { new: true }
    ).then((user) => {
      console.log("token is updated");
    });

    return res.status(200).json({ message: "Logout successfully!" });
  },
};

export default authController;
