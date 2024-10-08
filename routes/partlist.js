var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) 
{
  res.send('respond with a resource');
});

router.get('/:listName', function(req, res, next) 
{
  //res.send('this will fetch '+req.params.listName+".json");
  let listName = req.params.listName;
  res.render('partlist', { title: "Parts List", listName: listName });
});

router.param("listName",(req, res, next, listName) => 
{
  //console.log(listName);
  next();
});

module.exports = router;