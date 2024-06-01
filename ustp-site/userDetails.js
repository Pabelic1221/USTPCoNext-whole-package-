const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    idNumber: String, // Added idNumber field
    bio: String,
    birthday: Date,
    country: String,
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /\+63\d{9}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    website: String
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);
