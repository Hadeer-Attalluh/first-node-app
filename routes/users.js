var express = require('express');
var router = express.Router();
var users = require('../Data/Users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('userListing', { users });
});
router.get('/add', function (req, res, next) {
  res.render('addUser');
});
router.post('/add', function (req, res, next) {
  var newUser = {};
  // debugger;
  newUser.id = users[users.length - 1].id + 1;
  newUser.name = req.body.name;
  newUser.age = req.body.age;
  users.push(newUser);
  res.redirect('/users');
});

router.get('/delete', function (req, res, next) {
  res.render('deleteUser', { users });
});


router.post('/delete', function (req, res, next) {
  // debugger;
  // console.log(Number(req.query.params.userID));
  var id = Number(req.body.id);
  // var id = Number(req.query.params.userID);
  var userindex = users.findIndex(u => u.id === id);
  users.splice(userindex, 1);
  res.redirect('/users');
});

router.get('/edit', function (req, res, next) {
  res.render('editUser', { users });
});
router.post('/edit', function (req, res, next) {
  var id = Number(req.body.id);
  var userindex = users.findIndex(u => u.id === id);
  users[userindex].name = req.body.newName === "" ? users[userindex].name : req.body.newName;
  users[userindex].age = req.body.newAge === "" ? users[userindex].name : Number(req.body.newAge);

  res.redirect('/users');
});
module.exports = router;
