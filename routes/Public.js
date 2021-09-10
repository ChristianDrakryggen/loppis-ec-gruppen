const express = require("express");
const publicRouter = express.Router();
const User = require("../models/User");

//get all users
publicRouter.get("/getallusers", (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    } else {
      res.status(200).json({ users });
    }
  });
});

//get specific user with a populated products array
publicRouter.get("/getuserproducts/:id", (req, res) => {
  User.findById({ _id: req.params.id })
    .populate("products")
    .exec((err, user) => {
      if (err) {
        res
          .status(500)
          .json({ message: { msgBody: "An error occured", msgError: true } });
      } else {
        res.status(200).json({
          username: user.username,
          storename: user.storename,
          products: user.products,
        });
      }
    });
});

module.exports = publicRouter;
