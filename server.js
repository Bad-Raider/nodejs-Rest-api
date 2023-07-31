import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST } = process.env;

// const DB_HOST = "mongodb+srv://Stanislav:0tAQg5N2DH4TAKl9@cluster0.kt4auyt.mongodb.net/my-contacts?retryWrites=true&w=majority"; 

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    });
  })
  .catch(error=>console.log(error.message))

