var express = require('express');
var router = express.Router();
var {Client}=require('pg');

//const user=process.env.USER;
//const dbpassword=process.env.PASSWORD;
// console.log(dbpassword);

//定義
var emp_no=[];
var sheet_year=[];
var sheet_month=[];
var branch_no=[];
var year=[];
var month=[];
var day=[];
var trans_type=[];
var trans_from=[];
var trans_to=[];
var trans_waypoint=[];
var amount=[];
var count=[];
var job_no=[];
var job_manager=[];
var claim_flag=[];
var charge_flag=[];
var ref_no=[];
var status=[];
var remarks=[];
var new0=[];
var new_date=[];
var renew=[];
var renew_date=[];

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


  //交通費画面起動時 
  client.connect(async function(err, client) {
    if (err) {
      console.log(err); 
    } else {
      client.query("SELECT * FROM tedetail WHERE job_manager='1' AND (year="+yyyy+" AND month="+mm+" AND day BETWEEN '21' AND '31') OR (year="+yyyy+" AND month="+nn+" AND day BETWEEN '1' AND '20') AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC", function (err, result) {  //第１引数にSQL
       for(var i in result.rows){
            emp_no[i]=result.rows[i].emp_no;
            sheet_year[i]=result.rows[i].sheet_year;
            sheet_month[i]=result.rows[i].sheet_month;
            branch_no[i]=result.rows[i].branch_no;
            year[i]=result.rows[i].year;
            month[i]=result.rows[i].month;
            day[i]=result.rows[i].day;
            trans_type[i]=result.rows[i].trans_type;
            trans_from[i]=result.rows[i].trans_from;
            trans_to[i]=result.rows[i].trans_to;
            trans_waypoint[i]=result.rows[i].trans_waypoint
            amount[i]=result.rows[i].amount;
            count[i]=result.rows[i].count;
          　job_no[i]=result.rows[i].job_no;
            job_manager[i]=result.rows[i].job_manager;        
            claim_flag[i]=result.rows[i].claim_flag;
            charge_flag[i]=result.rows[i].charge_flag;
          　ref_no[i]=result.rows[i].ref_no;
            status[i]=result.rows[i].status;       
            remarks[i]=result.rows[i].remarks;
            new0[i]=result.rows[i].new;
            new_date[i]=result.rows[i].new_date;
            renew[i]=result.rows[i].renew;
            renew_date[i]=result.rows[i].renew_date;
          }
        });

  console.log(amount)
  console.log(count)

  total=amount * count;//合計金額を算出する為に記述したがNullで値が返ってくる

  let opt ={
      title:'JM承認画面',
      h3:'日付',
      emp_no:emp_no,
      sheet_year:sheet_year,
      sheet_month:sheet_month,
      branch_no:branch_no,
      year:year,
      month:month,
      day:day,
      trans_type:trans_type,
      trans_from:trans_from,
      trans_to:trans_to,
      trans_waypoint:trans_waypoint,
      amoun:amoun,
      count:count,
      job_no:job_no,
      job_manager:job_manager,
      claim_flag:claim_flag,
      charge_flag:charge_flag,
      ref_no:ref_no,
      status:status,
      remarks:remarks,
      new0:new0,
      new_date:new_date,
      renew:renew,
      renew_date:renew_date,
        }

    res.render('jmkotsuhi',opt);
  }
  });

  //確定ボタン押下時にjmkotsuhiから情報取得してtecommentへINSERTする文
  router.post('/',async function(req,res,next){
    let emp_no1=req.body.emp_no;
    let sheet_year1=req.body.sheet_year;
    let sheet_month1=req.body.sheet_month;
    let branch_no1=req.body.branch_no;
    let app_class1=req.body.app_class;
    let job_manager1=req.body.job_manager;
    let app_flag1=req.body.app_flag;
    let comment1=req.body.comment;
    let new1=req.body.new;
    let new_date1=req.body.new_date;
    let renew1=req.body.renew;
    var renew_date1=req.body.renew_date;
  
    const query = {
      text: 'INSERT INTO tecomments(emp_no, sheet_year, sheet_month, branch_no, app_class, job_manager, app_flag, comment, new, new_date, renew, renew_date) VALUES($1, $2, $3, $4 ,$5, $6 ,$7 ,$8 ,$9, $10, $11, $12)',
      values: [emp_no1, sheet_year1, sheet_month1, branch_no1, app_class1, job_manager1, app_flag1, comment1, new1, new_date1, renew1, renew_date1],
    }
 
    client.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))
  
    response.redirect("/jmkotsuhi");
  })
}); 


module.exports = router;