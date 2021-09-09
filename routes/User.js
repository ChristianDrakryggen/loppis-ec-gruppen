const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");

//Function to create our json webtoken
const signToken = (userId) => {
  return jwt.sign(
    {
      iss: "Christian at Drakryggen",
      sub: userId,
    },
    "christianDrakryggen",
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

//-----------REGISTRATION, AUTHENTICATION, AUTHORIZATION-------------------//

//Save new user to db
userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    }
    if (user) {
      res.status(400).json({
        message: { msgBody: "Username allready taken", msgError: true },
      });
    } else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(200).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
        }
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access-token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username },
        message: { msgBody: "Successfully logged in", megError: false },
      });
    }
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username, storename, firstname, lastname, email, phone } =
      req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { _id, username, storename, firstname, lastname, email, phone },
    });
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access-token");
    res.status(200).json({
      user: { username: "" },
      message: { msgBody: "User has been logged out" },
      success: true,
    });
  }
);

//-----------USERINFO-------------------//

userRouter.put(
  "/updateuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { storename, firstname, lastname, email, phone } = req.body;
    User.findByIdAndUpdate(
      req.user._id,
      { storename, firstname, lastname, email, phone },
      (err) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(200).json({
            message: {
              msgBody: "Successfully updated user info",
              msgError: false,
            },
          });
        }
      }
    );
  }
);

//-----------PRODUCTS-------------------//

userRouter.post(
  "/newproduct",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const product = new Product(req.body);
    product.save((err) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "An error occured", msgError: true },
        });
      } else {
        req.user.products.push(product);
        req.user.save((err) => {
          if (err) {
            res.status(500).json({
              message: { msgBody: "An error occured", msgError: true },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully added product",
                msgError: false,
              },
              isAuthenticated: true,
            });
          }
        });
      }
    });
  }
);

userRouter.get(
  "/getproducts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user.id })
      .populate("products")
      .exec((err, user) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "An error occured", msgError: true },
          });
        } else {
          res.status(200).json({
            products: user.products,
            isAuthenticated: true,
            msgError: false,
          });
        }
      });
  }
);

userRouter.post(
  "/removeproduct/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.products.pull({ _id: req.params.id });
    req.user.save((err) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "An error occured", msgError: true },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Successfully removed product",
            msgError: false,
          },
        });
      }
    });
  }
);

module.exports = userRouter;
