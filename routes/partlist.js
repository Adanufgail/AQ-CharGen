var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var commonList;
fs.readFile(path.join(__dirname, '../common.json'), 'utf8', function (err, data) {
  if (err) throw err;
  commonList = JSON.parse(data);
});

/* GET users listing. */
router.get('/', function(req, res, next) 
{
  res.send('respond with a resource');
});

router.get('/:listName', function(req, res, next) 
{
  //res.send('this will fetch '+req.params.listName+".json");
  let listName = req.params.listName;
  let commonKeys = Object.keys(commonList);
  var randCommonKey = commonKeys[Math.floor(Math.random() *commonKeys.length)];
  let randPart = commonList[randCommonKey];
  res.render('partlist', { title: "Parts List", listName: listName, randPart: randPart });
});

router.param("listName",(req, res, next, listName) => 
{
  //console.log(listName);
  next();
});

module.exports = router;