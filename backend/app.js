if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const port = process.env.PORT;
const dbURL = process.env.URL;

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
}


app.all("*" , (req,res)=>{
    res.send("page not found")
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});