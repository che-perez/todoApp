const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.index = (req, res) => {
  res.json({
    message: 'Put a user profile page on this route',
    data: {
      user: req.user,
    },
  });
};

usersController.create = (req, res, next) => {
 const salt = bcrypt.genSaltSync();
 const hash = bcrypt.hashSync(req.body.password, salt);
 
 User.create({
  username: req.body.username,
  email: req.body.email,
  password_digest: hash,
  firstname: req.body.firstname,
  lastname: req.body.lastname,
 }).then(user => {
  req.login(user, (err) => {
   if(err) return next(err);
   res.redirect('/todo/add');
  });
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   errror: err
  });
 });
}

module.exports = usersController;