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
    password:dbpassword,
    port:5432,
  });

  var job_manager0=req.body.job_manager0;
 
  await client.connect();

  client.query(sql,(err,result)=>{

    //定義
    var emp_no=[];
    var sheet_year=[];
    var sheet_month=[];
    var branch_no=[];
    var year=[];
    var month=[];
    var day=[];
    var amount=[];
    var count=[];
    var job_no=[];
    var job_manager=[];
    var claim_flag=[];
    var charge_flag=[];
    var ref_no=[];
    var status=[];
    var remarks=[];
    var radioname=[];
    var hiddenmonth=[];
    var code_name=[];
    var summary=[];
    var payee=[];
    var new0=[];
    var new_date=[];
    var renew=[];
    var renew_date=[];

    for(var i in result.rows){
    
      status[i]=result.rows[i].status; 
      ref_no[i]=result.rows[i].ref_no;
      code_name[i]=result.rows[i].code_name;
      day[i]=result.rows[i].month + '/' +result.rows[i].day;
      amount[i]=result.rows[i].amount;
      claim_flag[i]=result.rows[i].claim_flag;
      charge_flag[i]=result.rows[i].charge_flag;      
      remarks[i]=result.rows[i].remarks;
      radioname[i]='radioname' +[i];
      job_no[i]=result.rows[i].job_no;   
      emp_no[i]=result.rows[i].emp_no;
      summary[i]=result.rows[i].summary;
      payee[i]=result.rows[i].payee;
      
    } //for締める

    client.end();

    let opt ={
      title:'JM承認 - 経費',
      year:yyyy,
      nowmonth:nn,
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
      radioname:radioname,
      hiddenmonth:nn,
      job_no:job_no,
      emp_no:emp_no,
      code_name: code_name,
      summary:summary,
      payee:payee,

    }

    //レンダーする
    res.render('jmkehi', opt);

  });//client.connect締める
});//router.get締める



router.post('/',async function(req,response,next){


  //先月データボタンを押したとき
  if(req.body.previousmonth){
    nn = nn -1;
    mm = mm -1;

    //DBに接続
    var client =new Client({
      user:'postgres',
      host:'localhost',
      database:'itpjph3',
      password:dbpassword,
      port:5432,
    });
  });  

    // client.connect();   //これは必ず必要

    //「承認期間中のもの」かつ「社員IDが自分のもの」かつ「JM承認中のステータス」の条件でデータを指定して、ejsに渡す
    // let sql = "SELECT * FROM tedetail WHERE job_manager='111' AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
    let sql = "SELECT * FROM exdetail WHERE job_manager='111' AND (year='"+yyyy+"' AND month='0"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='0"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
    console.log(sql);

    //これは必ず必要
    await client.connect();

    client.query(sql,(err,result)=>{

    //定義
    var emp_no=[];
    var sheet_year=[];
    var sheet_month=[];
    var branch_no=[];
    var year=[];
    var month=[];
    var day=[];
    var amount=[];
    var count=[];
    var job_no=[];
    var job_manager=[];
    var claim_flag=[];
    var charge_flag=[];
    var ref_no=[];
    var status=[];
    var remarks=[];
    var radioname=[];
    var hiddenmonth=[];
    var code_name=[];
    var summary=[];
    var payee=[];
    var new0=[];
    var new_date=[];
    var renew=[];
    var renew_date=[];

    for(var i in result.rows){
    
      status[i]=result.rows[i].status; 
      ref_no[i]=result.rows[i].ref_no;
      code_name[i]=result.rows[i].code_name;
      day[i]=result.rows[i].month + '/' +result.rows[i].day;
      amount[i]=result.rows[i].amount;
      claim_flag[i]=result.rows[i].claim_flag;
      charge_flag[i]=result.rows[i].charge_flag;      
      remarks[i]=result.rows[i].remarks;
      radioname[i]='radioname' +[i];
      job_no[i]=result.rows[i].job_no;   
      emp_no[i]=result.rows[i].emp_no;
      summary[i]=result.rows[i].summary;
      payee[i]=result.rows[i].payee;
      
    } //for締める

    client.end();

    let opt ={
      title:'JM承認 - 経費',
      year:yyyy,
      nowmonth:nn,
      month:month,
      day:day,
      amount:amount,
      claim_flag:claim_flag,
      charge_flag:charge_flag,
      ref_no:ref_no,
      status:status,
      remarks:remarks,
      radioname:radioname,
      hiddenmonth:nn,
      job_no:job_no,
      emp_no:emp_no,
      code_name: code_name,
      summary:summary,
      payee:payee,

    }

      //レンダーする
      response.render('jmkehi', opt);

    });//client.query締める
  } //req.body.previousmonth締める


  //次月データボタンを押したとき
  else if(req.body.nextmonth){
    nn = nn -1+2;
    mm = mm -1+2;

    //DBに接続
    var client =new Client({
      user:'postgres',
      host:'localhost',
      database:'itpjph3',
      password:dbpassword,
      port:5432,
    });

    //「承認期間中のもの」かつ「社員IDが自分のもの」かつ「JM承認中のステータス」の条件でデータを指定して、ejsに渡す
    // let sql = "SELECT * FROM tedetail WHERE job_manager='111' AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
    let sql = "SELECT * FROM exdetail WHERE job_manager='111' AND (year='"+yyyy+"' AND month='0"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='0"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
    console.log(sql);
    
    //これは必ず必要
    await client.connect();

    client.query(sql,(err,result)=>{

    //定義
    var emp_no=[];
    var sheet_year=[];
    var sheet_month=[];
    var branch_no=[];
    var year=[];
    var month=[];
    var day=[];
    var amount=[];
    var count=[];
    var job_no=[];
    var job_manager=[];
    var claim_flag=[];
    var charge_flag=[];
    var ref_no=[];
    var status=[];
    var remarks=[];
    var radioname=[];
    var hiddenmonth=[];
    var code_name=[];
    var summary=[];
    var payee=[];
    var new0=[];
    var new_date=[];
    var renew=[];
    var renew_date=[];

    for(var i in result.rows){
    
      status[i]=result.rows[i].status; 
      ref_no[i]=result.rows[i].ref_no;
      code_name[i]=result.rows[i].code_name;
      day[i]=result.rows[i].month + '/' +result.rows[i].day;
      amount[i]=result.rows[i].amount;
      claim_flag[i]=result.rows[i].claim_flag;
      charge_flag[i]=result.rows[i].charge_flag;      
      remarks[i]=result.rows[i].remarks;
      radioname[i]='radioname' +[i];
      job_no[i]=result.rows[i].job_no;   
      emp_no[i]=result.rows[i].emp_no;
      summary[i]=result.rows[i].summary;
      payee[i]=result.rows[i].payee;
      
    } //for締める

    client.end();

    let opt ={
      title:'JM承認 - 経費',
      year:yyyy,
      nowmonth:nn,
      month:month,
      day:day,
      amount:amount,
      claim_flag:claim_flag,
      charge_flag:charge_flag,
      ref_no:ref_no,
      status:status,
      remarks:remarks,
      radioname:radioname,
      hiddenmonth:nn,
      job_no:job_no,
      emp_no:emp_no,
      code_name: code_name,
      summary:summary,
      payee:payee,

    }

      //レンダーする
      response.render('jmkehi', opt);
    
    });//client.query締める
  } //req.body.nextmonth締める


  //確定ボタンが押されたとき
  else if(req.body.confirm){

    //メール送信機能
    function mailsend(sub,tex){
      //メール送信者・受信者・PWの設定
      var receiverEmailAddress = 'achijiiwa@skylight.co.jp'
      var senderEmailAddress = 'test.itpj@gmail.com'
      var senderEmailPassword = 'ogrsnpgudnugutav'
    
      //SMTPサーバの基本情報設定
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL
        auth: {
          user: senderEmailAddress,
          pass: senderEmailPassword
        }
      });
    
      //メール情報の作成
      var mailOptions1 = {
        from: senderEmailAddress,
        to: receiverEmailAddress,
        subject: sub,
        text: tex
      };
    
      // メールの送信
      transporter.sendMail(mailOptions1, function (error, info) {
        if (error) {console.log('失敗');} 
        else {console.log('成功');}
      });

    }//function mail.sendを締める

    //for文で回すために、連想配列(req.body)を配列に変換している
    for(let [key, value] of Object.entries(req.body)){

      //承認にチェックがあるとき
      if(value==='1'){
        mailsend('【EX WEB】承認のお知らせ','経費申請項目の中に承認されたものがあります（ジョブマネジャーによる承認）。内容をご確認ください。');}
      //却下にチェックがあるとき
      else if(value==='2'){
        mailsend('【EX WEB】却下のお知らせ','経費申請項目の中に却下されたものがあります（ジョブマネジャーによる却下）。内容をご確認ください。');}

    };//for文を締める

    //DBに接続
    var client =new Client({
      user:'postgres',
      host:'localhost',
      database:'itpjph3',
      password:dbpassword,
      port:5432,
    });
  });

    nn = nn-1+1;
    mm = mm-1+1;

    //「承認期間中のもの」かつ「社員IDが自分のもの」かつ「JM承認中のステータス」の条件でデータを指定して、ejsに渡す
    let sql = "SELECT * FROM exdetail WHERE job_manager='111' AND (year='"+yyyy+"' AND month='0"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='0"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
    console.log(sql);

    //これは必ず必要
    await client.connect();

    client.query(sql,(err,result)=>{

    //定義
    var emp_no=[];
    var sheet_year=[];
    var sheet_month=[];
    var branch_no=[];
    var year=[];
    var month=[];
    var day=[];
    var amount=[];
    var count=[];
    var job_no=[];
    var job_manager=[];
    var claim_flag=[];
    var charge_flag=[];
    var ref_no=[];
    var status=[];
    var remarks=[];
    var radioname=[];
    var hiddenmonth=[];
    var code_name=[];
    var summary=[];
    var payee=[];
    var new0=[];
    var new_date=[];
    var renew=[];
    var renew_date=[];

    for(var i in result.rows){
    
      status[i]=result.rows[i].status; 
      ref_no[i]=result.rows[i].ref_no;
      code_name[i]=result.rows[i].code_name;
      day[i]=result.rows[i].month + '/' +result.rows[i].day;
      amount[i]=result.rows[i].amount;
      claim_flag[i]=result.rows[i].claim_flag;
      charge_flag[i]=result.rows[i].charge_flag;      
      remarks[i]=result.rows[i].remarks;
      radioname[i]='radioname' +[i];
      job_no[i]=result.rows[i].job_no;   
      emp_no[i]=result.rows[i].emp_no;
      summary[i]=result.rows[i].summary;
      payee[i]=result.rows[i].payee;
      
    } //for締める

    client.end();

    let opt ={
      title:'JM承認 - 経費',
      year:yyyy,
      nowmonth:nn,
      month:month,
      day:day,
      amount:amount,
      claim_flag:claim_flag,
      charge_flag:charge_flag,
      ref_no:ref_no,
      status:status,
      remarks:remarks,
      radioname:radioname,
      hiddenmonth:nn,
      job_no:job_no,
      emp_no:emp_no,
      code_name: code_name,
      summary:summary,
      payee:payee,

    }

    //レンダーする
    response.render('jmkehi', opt);

  });//client.connect締める
 } //if(req.body.confirm)を締める
}) //router.post締める

  module.exports = router;