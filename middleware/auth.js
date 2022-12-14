import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // extracting token from header
    const token = req.headers.authorization.split(" ")[1];

    // verifying header and storing the user data in decodedata

    let decodeData = jwt.verify(token, process.env.JWT_SECRET);
    // updating the req by providing userID so further requests can be processed considering this is the user
    req.userId = decodeData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
