const Userdb = require("../model/model");
var userdb = require("../model/model");
//create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new user
  const user = new userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  //save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error Occured In App ",
      });
    });
};
//retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
  const id = req.params.id;
  console.log("ID@@", req.params.id);
  if (req?.params?.id) {
    userdb
      .findById(req?.params?.id)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user information",
        });
      });
  } else {
    userdb
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user information",
        });
      });
  }
};
//Update a new identified user by user ID
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to upgrade can not be empty" });
  }
  const id = req.params.id;
  userdb
    .findByIdAndUpdate(id)
    .then((data) => {
      console.log("DAT@@@", req.body);
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found`,
        });
      } else {
        res.send(req.body);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};
//Delete a user with specified ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        console.log("DATA$$$", data);
        res.status(404).send({
          message: `Cannot Delete with this ${id} maybe Wrong request`,
        });
      } else {
        res.send({ message: "User was deleted successfully", id });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete User with this ID=` + id,
        err,
      });
    });
};
