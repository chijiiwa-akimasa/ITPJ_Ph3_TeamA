var express = require('express');
var router = express.Router();
var {Client}=require('pg');
const { connect } = require('./login');

//定義
var emp_no=[];
var sheet_year=[];
var sheet_month=[];
var branch_no=[];
var year=[];
var month=[];
var day=[];
var code_name=[];
var payee=[];
var summary=[];
var amount=[];
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
var emp_name=[];

var emp_no2=[];
var sheet_year2=[];
var sheet_month2=[];
var branch_no2=[];
var year2=[];
var month2=[];
var day2=[];
var code_name2=[];
var payee2=[];
var summary2=[];
var amount2=[];
var job_no3=[];
var job_manager2=[];
var claim_flag2=[];
var charge_flag2=[];
var ref_no2=[];
var status3=[];
var remarks2=[];
var new02=[];
var new_date2=[];
var renew2=[];
var renew_date2=[];
var emp_name3=[];

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

  //経費承認画面起動時
 router.get('/',async function(req, res, next) { 
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'itpjph3',
    password:'ayaka0807',
    port:5432,
  });

  var job_manager0=req.body.job_manager0;
 
  await client.connect();
  
  client.query("SELECT * FROM exdetail ex,Employee em WHERE ex.emp_no= em.emp_no AND job_manager='"+job_manager0+"' AND (year='"+yyyy+"' AND month='"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY ex.emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC", function (err, result) {  
       //console.log(result) 
        for(var i in result.rows){
            emp_no[i]=result.rows[i].emp_no;
            sheet_year[i]=result.rows[i].sheet_year;
            sheet_month[i]=result.rows[i].sheet_month
            branch_no[i]=result.rows[i].branch_no
            year[i]=result.rows[i].year
            month[i]=result.rows[i].month
            day[i]=result.rows[i].day
            code_name[i]=result.rows[i].code_name
            payee[i]=result.rows[i].payee
            summary[i]=result.rows[i].summary
            amount[i]=result.rows[i].amount
            job_no[i]=result.rows[i].job_no
            job_manager[i]=result.rows[i].job_manager
            claim_flag[i]=result.rows[i].claim_flag
            charge_flag[i]=result.rows[i].charge_flag
            ref_no[i]=result.rows[i].ref_no
            status[i]=result.rows[i].status
            remarks[i]=result.rows[i].remarks
            new0[i]=result.rows[i].new0
            new_date[i]=result.rows[i].new_date
            renew[i]=result.rows[i].renew
            renew_date[i]=result.rows[i].renew_date
            emp_name[i]=result.rows[i].emp_name
          }
        
  client.end();

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
      code_name:code_name,
      payee:payee,
      summary:summary,
      amount:amount,
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
      emp_name:emp_name,
      }   

  res.render('jmkehi',opt);
    });
  });  

   // 条件検索結果をデータベースから取得するコード  
  router.post('/',async function(req, res, next) { 
   var client=new Client({
      user:'postgres',
      host:'localhost',
      database:'itpjph3',
      password:'ayaka0807',
      port:5432,
    }); 
  
      //JM（ログイン者）取得
      var job_manager1=req.body.job_manager0;
      //ステータス取得
      var status2=req.body.status2
      //社員名取得
      var emp_name2=req.body.emp_name2;
      // ジョブコード取得
      var job_no2=req.body.job_no2;
      // 期間取得
      var yyy1=req.body.yyy1;
      var m1=req.body.m1;
      var d1=req.body.d1;
      var yyy2=req.body.yyy2;
      var m2=req.body.m2;
      var d2=req.body.d2;
      console.log(status2)
      console.log(emp_name2)
      console.log(job_no2)
      console.log(yyy1)
      console.log(m1)
      console.log(d1)
      console.log(yyy2)
      console.log(m2)
      console.log(d2)
      
     await client.connect();

     client.query("SELECT * FROM exdetail ex,Employee em WHERE ex.emp_no= em.emp_no AND job_manager='"+job_manager1+"' AND (year='"+yyy1+"' AND month='"+m1+"' AND day>='"+d1+"') OR (year='"+yyy2+"' AND month='"+m2+"' AND day<='"+d2+"') AND status='"+status2+"' AND emp_name='"+emp_name2+"' AND job_no='"+job_no2+"' ORDER BY ex.emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC", function (err, result)  {  
        console.log(result) 
        for(var i in result.rows){
          emp_no2[i]=result.rows[i].emp_no;
          sheet_year2[i]=result.rows[i].sheet_year;
          sheet_month2[i]=result.rows[i].sheet_month
          branch_no2[i]=result.rows[i].branch_no
          year2[i]=result.rows[i].year
          month2[i]=result.rows[i].month
          day2[i]=result.rows[i].day
          code_name2[i]=result.rows[i].code_name
          payee2[i]=result.rows[i].payee
          summary2[i]=result.rows[i].summary
          amount2[i]=result.rows[i].amount
          job_no3[i]=result.rows[i].job_no
          job_manager2[i]=result.rows[i].job_manager
          claim_flag2[i]=result.rows[i].claim_flag
          charge_flag2[i]=result.rows[i].charge_flag
          ref_no2[i]=result.rows[i].ref_no
          status3[i]=result.rows[i].status
          remarks2[i]=result.rows[i].remarks
          new02[i]=result.rows[i].new0
          new_date2[i]=result.rows[i].new_date
          renew2[i]=result.rows[i].renew
          renew_date2[i]=result.rows[i].renew_date
          emp_name3[i]=result.rows[i].emp_name
          }
      client.end();

       let opt2 ={
        title:'JM承認画面',
        h3:'日付',
        emp_no:emp_no2,
        sheet_year:sheet_year2,
        sheet_month:sheet_month2,
        branch_no:branch_no2,
        year:year2,
        month:month2,
        day:day2,
        code_name:code_name2,
        payee:payee2,
        summary:summary2,
        amount:amount2,
        job_no:job_no3,
        job_manager:job_manager2,
        claim_flag:claim_flag2,
        charge_flag:charge_flag2,
        ref_no:ref_no2,
        status:status3,
        remarks:remarks2,
        new0:new02,
        new_date:new_date2,
        renew:renew2,
        renew_date:renew_date2,
        emp_name:emp_name3,
      }    

      console.log(opt2)

      res.render('jmkehi',opt2);
      
    });
  });


  module.exports = router;