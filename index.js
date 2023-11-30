import express from "express";
import bodyParser from "body-parser";
// var bodyParser = require("body-parser");
import mongoose from "mongoose";
// var mongoose = require("mongoose");
import cors from "cors";
// var cors = require("cors");
import dotenv from "dotenv";
// var dotenv = require("dotenv");
import multer from "multer";
// var multer = require("multer");
import helmet from "helmet";
// var helmet = require("helmet");
import morgan from "morgan";
// var morgan = require("morgan");
import path from "path";
// import path = require("path");
import { fileURLToPath } from "url";
import { error } from "console";
import { register } from "./controllers/Auth/index.js";

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
