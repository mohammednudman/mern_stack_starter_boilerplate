const User = require("./../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
const revokedTokens = new Set();

const registerController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  try {
    const checkIfUserIsPresent = await User.findOne({ username: username });

    if (checkIfUserIsPresent)
      return res.status(400).send({ message: "User Already exists" });

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });

    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          console.error("Error creating JWT:", err);
          return res.status(500).send({ message: "Error creating JWT" });
        }
        res
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .status(201)
          .json({ id: createdUser._id });
      },
    );
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

const profileController = async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  if (revokedTokens.has(token)) {
    return res.status(401).json({ message: "Unauthorized: Token revoked" });
  }

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) {
      console.error("Error verifying JWT:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    if (userData.exp && userData.exp * 1000 < Date.now()) {
      revokedTokens.add(token); // Add the token to the blacklist
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    res.json(userData);
  });
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const foundUser = await User.findOne({ username });

  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, username },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.error("Error creating JWT:", err);
            return res.status(500).send({ message: "Error creating JWT" });
          }
          res
            .cookie("token", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .status(201)
            .json({ id: foundUser._id });
        },
      );
    }
  }
};

module.exports = { registerController, loginController, profileController };
