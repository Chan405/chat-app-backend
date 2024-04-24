const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const fs = require("fs");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ayenyeinchanmoe0@gmail.com", // Your email address
    pass: "buuz yogf hbqh vsmz", // Your password for the email account
  },
});

const htmlContent = fs.readFileSync("./controllers/emailTemplate.html", "utf8");

const User = require("../models/userModel");

const handleRegister = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response
      .status(400)
      .json({ message: "Please add all the required fields" });
  }

  // Email content
  const mailOptions = {
    from: "ayenyeinchanmoe0@gmail.com",
    to: email,
    subject: "Welcome to Channie App",
    html: htmlContent,
  };

  try {
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashPassword,
        photo: request.file.filename,
      });

      if (user) {
        response
          .status(201)
          .json({ user: { name: user.name, email: user.email } });

        // Send email
        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.error("Error sending email:", error);
        //   } else {
        //     console.log("Email sent:", info.response);
        //   }
        // });
      } else {
        response.status(400).json({ message: "Invalid User" });
      }
    } else {
      response.status(400).json({ message: "User already exists" });
    }
  } catch (e) {
    console.log("REGISTER ERROR", e);
    response.status(400).json({ message: "Invalid User" });
  }
};

const handleLogin = async (request, response) => {
  const { email, password } = request.body;

  if (email && password) {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      response.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          id: user._id,
          profilePic: user.photo,
        },
      });
    } else {
      response.status(400).json({ message: "Invalid user credentials" });
    }
  } else {
    response.status(400).json({ message: "Enter user credentials" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getUsers = async (request, response) => {
  try {
    const users = await User.find();

    response.status(200).json({ users });
  } catch (e) {
    response.status(404).json({ message: "Invalid Error" });
  }
};

const getUserInfo = async (request, response) => {
  const { userId } = request.params;

  try {
    const user = await User.findById(userId);

    if (user) {
      response.status(200).json({ user });
    } else {
      response.status(404).json({ message: "No user found" });
    }
  } catch (e) {
    response.status(404).json({ message: "Invalid Error" });
  }
};

module.exports = {
  getUserInfo,
  handleLogin,
  handleRegister,
  getUsers,
};
