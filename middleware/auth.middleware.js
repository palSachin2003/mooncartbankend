import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization;
      let decodeToken = jwt.verify(token, process.env.SECRET_KEY);
      console.log(token)
      if (decodeToken) {
        next();
      } else {
        res.status(401).json({
          message: "Invalid token",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default auth;