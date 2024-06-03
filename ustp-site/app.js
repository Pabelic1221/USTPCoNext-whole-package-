const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const JWT_SECRET = "qwertyasdfzxc1238910!?";

const mongoUrl = "mongodb+srv://pabelicjush:Pabelic1221@cluster0.zou00st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
}).then(() => {
  console.log("connected to database");
}).catch((e) => console.log(e));

require("./userDetails");
require("./news");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
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
      role
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

app.post("/updateProfile", async (req, res) => {
  const { token, name, idNumber, currentPassword, newPassword, birthday, country, contactNumber } = req.body;
  try {
    // Verify token
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    // Log the decoded token info
    console.log("Decoded user from token:", user);

    // Find user by email
    const userRecord = await User.findOne({ email: userEmail });
    if (!userRecord) {
      console.log("User not found with email:", userEmail);
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Log found user record
    console.log("Found user record:", userRecord);

    // Update password if provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, userRecord.password);
      if (!isMatch) {
        console.log("Current password is incorrect for user:", userEmail);
        return res.status(400).json({ status: "error", message: "Current password is incorrect" });
      }
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      userRecord.password = encryptedPassword;
    }

    // Update general and info fields
    if (    name) userRecord.name = name;
    if (idNumber) userRecord.idNumber = idNumber;
    if (birthday) userRecord.birthday = birthday;
    if (country) userRecord.country = country;
    if (contactNumber) userRecord.contactNumber = contactNumber; // Save the contact number

    // Save updated user record
    await userRecord.save();

    res.json({ status: "okay", message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Fetch all news items sorted by date (latest first)
app.get("/news", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Fetch limited news items sorted by date (latest first)
app.get("/limited-news", async (req, res) => {
  const limit = parseInt(req.query.limit) || 3; // Default to 3 if limit is not specified
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(limit);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/create-news', authenticateToken, authorizeRole('admin'), upload.single('photo'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const news = new News({ title, description, photo });
    await news.save();
    res.status(200).json({ status: 'success', data: news });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.put('/news/:id', authenticateToken, authorizeRole('admin'), upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedNews = await News.findByIdAndUpdate(id, { title, description, photo }, { new: true });

    if (!updatedNews) {
      return res.status(404).json({ status: 'error', message: 'News not found' });
    }

    res.status(200).json({ status: 'success', data: updatedNews });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.delete('/news/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ status: 'error', message: 'News not found' });
    }

    res.status(200).json({ status: 'success', message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/upload-image', upload.single('imageFile'), (req, res) => {
  res.send('Image uploaded successfully');
});

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});

