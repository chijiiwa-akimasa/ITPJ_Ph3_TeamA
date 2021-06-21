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

//日付け取得　※交通費画面起動の際、〇/21～〇/20分のみ表示するために定義
var date = new Date();
var yyyy = date.getFullYear();
var mm = ("0"+(date.getMonth()+1)).slice(-2);//先月
var nn = ("0"+(date.getMonth()+2)).slice(-2);//今月
var dd = ("0"+date.getDate()).slice(-2);

if (dd<21) { // 例) 5/21~5/31の時→5/21~6/20表示、6/1~6/20の時→5/21~6/20表示
    mm -= 1
    nn -= 1
}
if (mm === 1 && dd<21) {
    yyyy -=1
}

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
      client.query("SELECT * FROM exdetail WHERE job_manager='1' AND (year='"+yyyy+"' AND month='"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC", function (err, result) {  //第１引数にSQL
        console.log(result)
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

module.exports = router;