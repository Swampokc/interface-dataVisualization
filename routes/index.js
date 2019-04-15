const Sequelize = require("sequelize");

var express = require('express');
var router = express.Router();

let db = require('../db');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var pop = await db.Population.findAll({
    raw: true
  });

  var mas = [];
  for (var i = 0; i < 88; i++) {
      mas[i] = pop[i].value;
  }

  res.render('index', {title: 'Express', pop: mas});
});

module.exports = router;
