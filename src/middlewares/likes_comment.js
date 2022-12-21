import jwt from 'jsonwebtoken';
import User from '../models/user'
const likes_Comments = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) {
      res.status(401).json({ Message: 'login first please' });
    } else {
      const token = bearerToken.split(" ")[1];
      const authentication = jwt.verify(token, process.env.TOKEN_SECRET);
      const userEmail = authentication.email;
      const userName = authentication.name;
      const exists = await User.findOne({ email: userEmail });
      if (!exists) {
        res.status(401).json({ message: "login first please" });
      } else {
        res.locals.email = userEmail;
        res.locals.name = userName;
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};
export default likes_Comments