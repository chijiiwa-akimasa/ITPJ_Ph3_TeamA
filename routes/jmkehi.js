var express = require('express');
const { options } = require('.');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('jmkehi', {

    title: 'JM承認画面' ,
    h3:'ここに今月の日付が入るようにする' ,
    status:'',
    refno:'',
    from:'',
    to:'',
    times:'',
    tatekae:'',
    jobc:'',
    date:'',
    price:'',
    subtotal:'',
    
  });
});

module.exports = router;