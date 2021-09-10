const express = require("express");
app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

//sets up connection to db
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/new-ec-group-loppis-db",
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => {
    console.log("mongodb is connected");
  }
);

//private user routes
const userRouter = require("./routes/User");
app.use("/user", userRouter);

//public routes
const publicRouter = require("./routes/Public");
app.use("/public", publicRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
