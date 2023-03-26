import jwt from "jsonwebtoken";

const middleWare = {
  // VERIFY TOKEN
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          // 403 - Forbidden
          return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ message: "You're not authenticated" });
    }
  },

  verifyTokenAndAdmin: (req, res, next) => {
    middleWare.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "You're not allowed to access this roles" });
      }
    });
  },
  verifyTokenAndAuthorization: (req, res, next) => {
    middleWare.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "You're not allowed to do that!" });
      }
    });
  },
};

export default middleWare;
