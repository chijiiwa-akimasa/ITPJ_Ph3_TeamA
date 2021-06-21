var express = require('express');
var router = express.Router();
var {Client}=require('pg');

//const user=process.env.USER;
//const dbpassword=process.env.PASSWORD;
// console.log(dbpassword);

var status=[];
var ref_no=[];
var month=[];
var day=[];
var code_name=[];
var summary=[];
var claim_flag=[];
var charge_flag=[];
var amount=[];
var payee=[];

/* Heroku・Postgres接続*/
 /*router.get('/', function(req, res, next) {
  const client =
   (process.env.ENVIRONMENT == "LIVE") ? new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    }
  }) :

    new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'TeDetail',
    password: dbpassword,
    port: 5432
})
 client.conect()　*/
 router.get('/',async function(req, res, next) { 
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'itpjph3',
    password:'ayaka0807',
    port:5432,
});


  //console.log(client)
  //client.query('SELECT *from TeDetail', function(err, result){
  //  if (err){
  //    console.log(err) //show error information
  //  }
  //  console.log(result)
  //})

  client.connect(async function(err, client) {
    if (err) {
      console.log(err); //エラー時にコンソールに表示
    } else {
      client.query("SELECT * FROM exdetail", function (err, result) {  //第１引数にSQL
       for(var i in result.rows){
          　status[i]=result.rows[i].status;
          　ref_no[i]=result.rows[i].ref_no;
            month[i]=result.rows[i].month;
            day[i]=result.rows[i].day;
            code_name[i]=result.rows[i].code_name;
            summary[i]=result.rows[i].summary;
            claim_flag[i]=result.rows[i].claim_flag;
            charge_flag[i]=result.rows[i].charge_flag;
            amount[i]=result.rows[i].amount;
            payee[i]=result.rows[i].payee;
          }
        });


let opt ={
    title:'JM承認画面',
    h3:'日付',//自動で〇月分と入るようにする
  　status:status,
  　ref_no:ref_no,
    month:month,
    day:day,
    code_name:code_name,
    summary:summary,
    claim_flag:claim_flag,
    charge_flag:charge_flag,
    amount:amount,
    payee:payee,
 }

  res.render('jmkehi',opt);
 }
});
});

/* GET home page.
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
});*/


module.exports = router;