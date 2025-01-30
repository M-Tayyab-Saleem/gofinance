const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email']
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: 'user'
    },
    status: {
      type: String,
      default: 'active'
    },
  }
);


 const User = mongoose.model("User", userSchema);
 module.exports = User;
