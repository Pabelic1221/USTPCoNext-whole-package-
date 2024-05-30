const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const router = express.Router();

app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const jwt = require("jsonwebtoken");
const JWT_SECRET = "qwertyasdfzxc1238910!?";

const mongoUrl = "mongodb+srv://pabelicjush:Pabelic1221@cluster0.zou00st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
}).then(() => {
  console.log("connected to database");
}).catch((e) => console.log(e));

require("./userDetails");
require("./news");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage });
const User = mongoose.model("UserInfo");
const News = mongoose.model("News");

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware to authorize based on role
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};



app.post("/register", async (req, res) => {
  const { fname, lname, email, password, role } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      role // Store the role
    });
    res.send({ status: "okay" });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log(error.message);
      res.send({ error: "Validation Error" });
    } else if (error.name === "MongoError" && error.code === 11000) {
      res.send({ error: "Duplicate Key Error" });
    } else {
      res.send({ error: "Unknown Error" });
    }
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    if (res.status(201)) {
      return res.json({ status: "okay", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "okay", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.send({ status: "error", error: "Invalid Token" });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json("User Not Exist!");
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
    const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
    console.log(link);
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exist!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exist!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({
      _id: id,
    }, {
      $set: {
        password: encryptedPassword,
      }
    });
    res.json({ status: "Password Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

// Update profile
app.post("/updateProfile", async (req, res) => {
    const { token, fname, lname, email, role, bio, birthday, country, phone, website } = req.body;
  
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const userEmail = user.email;
  
      await User.updateOne(
        { email: userEmail },
        { $set: { fname, lname, email, role, bio, birthday, country, phone, website } }
      );
  
      res.send({ status: "okay" });
    } catch (error) {
      res.send({ status: "error", error: error.message });
    }
  });

  //fetch NEWS
  app.get("/news", async (req, res) => {
    try {
      const news = await News.find({});
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  // Create news endpoint with authentication and authorization
  app.post('/create-news', authenticateToken, authorizeRole('admin'), upload.single('photo'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;
  
      const news = new News({
        title,
        description,
        photo,
      });
  
      await news.save();
  
      res.status(200).json({ status: 'success', data: news });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  
app.listen(5000, () => {
  console.log("port 5000, Server started...");
});
