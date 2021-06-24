const { text } = require('express');
const { response } = require('express');
var express = require('express');
var nodemailer = require('nodemailer');
const { options } = require('.');
var router = express.Router();
var {Client}=require('pg');
const e = require('express');

require('dotenv').config();
const user=process.env.USER;
const dbpassword=process.env.PASSWORD;

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

router.get('/', async function(req, res, next) {

    const client = (process.env.ENVIRONMENT == "LIVE") ? new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
      }) : new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'itpjph3',
        password: dbpassword,
        port: 5432
      })
  
    nn = nn-1+1;
    mm = mm-1+1;

    //「承認期間中のもの」かつ「社員IDが自分のもの」かつ「JM承認中のステータス」の条件でデータを指定して、ejsに渡す
    let sql = "SELECT * FROM tedetail WHERE job_manager='111' AND (year='"+yyyy+"' AND month='0"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='0"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
    let sql1 = "SELECT * FROM Employee";

    //これは必ず必要
    await client.connect();

    //一つ目のクエリを実行(社員テーブル)
    client.query(sql1,(err1,result1)=>{

        let shain = result1.rows;

        for(let i = 0; i <= result1.rows; i++){
            shain.push(result1.rows[i])
        }

        //二つ目のクエリを実行(交通費詳細テーブル)
        client.query(sql,(err,result)=>{

            let rireki = result.rows;
            let subtotal =[];
            let sum = [];
            let radioname = [];

            for(let i = 0; i <= result.rows; i++){

                rireki.push(result.rows[i])

                subtotal[i]=result.rows[i].amount*result.rows[i].count;

                //小計(subtotal)の配列をすべて足す
                sum[i] = subtotal.reduce(function(sumsum, element){
                    return sumsum + element;
                }, 0);

                radioname[i]='radioname' +[i];
            }

            client.end();

            let opt={
                title:'JM承認 - 交通費',
                shain:shain,
                rireki:rireki,
                year:yyyy,
                nowmonth:nn,
                sum:sum,
                subtotal:subtotal,
                radioname:radioname,
            }

            res.render('jmkotsuhi3', opt);  

        });//2つ目のclient.query締める
    });//1つ目のclient.query締める
});//router.get締める


router.post('/',async function(req,res,next){


    //先月データボタンを押したとき
    if(req.body.previousmonth){
      nn = nn -1;
      mm = mm -1;
  
      const client = (process.env.ENVIRONMENT == "LIVE") ? new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
      }) : new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'itpjph3',
        password: dbpassword,
        port: 5432
      })

        let sql = "SELECT * FROM tedetail te,Employee em WHERE te.emp_no= em.emp_no AND job_manager='111' AND (year='"+yyyy+"' AND month='0"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='0"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY te.emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
        let sql1 = "SELECT * FROM Employee";

        //これは必ず必要
        await client.connect();

        //一つ目のクエリを実行(社員テーブル)
        client.query(sql1,(err1,result1)=>{

            let shain = result1.rows;

            for(let i = 0; i <= result1.rows; i++){
                shain.push(result1.rows[i])
            }

            //二つ目のクエリを実行(交通費詳細テーブル)
            client.query(sql,(err,result)=>{

                let rireki = result.rows;
                let subtotal =[];
                let sum = [];
                let radioname = [];
    
                for(let i = 0; i <= result.rows; i++){
    
                    rireki.push(result.rows[i])
    
                    subtotal[i]=result.rows[i].amount*result.rows[i].count;
    
                    //小計(subtotal)の配列をすべて足す
                    sum[i] = subtotal.reduce(function(sumsum, element){
                        return sumsum + element;
                    }, 0);
    
                    radioname[i]='radioname' +[i];
                }
    
                client.end();
    
                let opt={
                    title:'JM承認 - 交通費',
                    shain:shain,
                    rireki:rireki,
                    year:yyyy,
                    nowmonth:nn,
                    sum:sum,
                    subtotal:subtotal,
                    radioname:radioname,
                }
                res.render('jmkotsuhi3', opt);  

            });//2つ目のclient.query締める
        });//1つ目のclient.query締める
    } //req.body.previousmonth締める


    //次月データボタンを押したとき
    else if(req.body.nextmonth){
        nn = nn -1+2;
        mm = mm -1+2;
    
        const client = (process.env.ENVIRONMENT == "LIVE") ? new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
          }) : new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'itpjph3',
            password: dbpassword,
            port: 5432
          })

        let sql = "SELECT * FROM tedetail te,Employee em WHERE te.emp_no= em.emp_no AND job_manager='111' AND (year='"+yyyy+"' AND month='0"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='0"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY te.emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
        let sql1 = "SELECT * FROM Employee";

        //これは必ず必要
        await client.connect();

        //一つ目のクエリを実行(社員テーブル)
        client.query(sql1,(err1,result1)=>{

            let shain = result1.rows;

            for(let i = 0; i <= result1.rows; i++){
                shain.push(result1.rows[i])
            }

            //二つ目のクエリを実行(交通費詳細テーブル)
            client.query(sql,(err,result)=>{

                let rireki = result.rows;
                let subtotal =[];
                let sum = [];
                let radioname = [];
    
                for(let i = 0; i <= result.rows; i++){
    
                    rireki.push(result.rows[i])
    
                    subtotal[i]=result.rows[i].amount*result.rows[i].count;
    
                    //小計(subtotal)の配列をすべて足す
                    sum[i] = subtotal.reduce(function(sumsum, element){
                        return sumsum + element;
                    }, 0);
    
                    radioname[i]='radioname' +[i];
                }
    
                client.end();
    
                let opt={
                    title:'JM承認 - 交通費',
                    shain:shain,
                    rireki:rireki,
                    year:yyyy,
                    nowmonth:nn,
                    sum:sum,
                    subtotal:subtotal,
                    radioname:radioname,
                }
                res.render('jmkotsuhi3', opt);  

            });//2つ目のclient.query締める
        });//1つ目のclient.query締める
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

        console.log(req.body);

        //承認にチェックがあるとき
        if(value==='1'){
            mailsend('【EX WEB】承認のお知らせ','交通費申請項目の中に承認されたものがあります（ジョブマネジャーによる承認）。内容をご確認ください。');}
        //却下にチェックがあるとき
        else if(value==='2'){
            mailsend('【EX WEB】却下のお知らせ','交通費申請項目の中に却下されたものがあります（ジョブマネジャーによる却下）。内容をご確認ください。');}

        };//for文を締める

        nn = nn-1+1;
        mm = mm-1+1;

        const client = (process.env.ENVIRONMENT == "LIVE") ? new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
          }) : new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'itpjph3',
            password: dbpassword,
            port: 5432
          })

        let sql = "SELECT * FROM tedetail te,Employee em WHERE te.emp_no= em.emp_no AND job_manager='111' AND (year='"+yyyy+"' AND month='0"+mm+"' AND day BETWEEN '21' AND '31') OR (year='"+yyyy+"' AND month='0"+nn+"' AND day BETWEEN '1' AND '20') AND status='11' ORDER BY te.emp_no ASC,sheet_year ASC,sheet_month ASC,branch_no ASC,job_no ASC";
        let sql1 = "SELECT * FROM Employee";

        //これは必ず必要
        await client.connect();

        //一つ目のクエリを実行(社員テーブル)
        client.query(sql1,(err1,result1)=>{

            let shain = result1.rows;

            for(let i = 0; i <= result1.rows; i++){
                shain.push(result1.rows[i])
            }

            //二つ目のクエリを実行(交通費詳細テーブル)
            client.query(sql,(err,result)=>{

                let rireki = result.rows;
                let subtotal =[];
                let sum = [];
                let radioname = [];
    
                for(let i = 0; i <= result.rows; i++){
    
                    rireki.push(result.rows[i])
    
                    subtotal[i]=result.rows[i].amount*result.rows[i].count;
    
                    //小計(subtotal)の配列をすべて足す
                    sum[i] = subtotal.reduce(function(sumsum, element){
                        return sumsum + element;
                    }, 0);
    
                    radioname[i]='radioname' +[i];
                }
    
                client.end();
    
                let opt={
                    title:'JM承認 - 交通費',
                    shain:shain,
                    rireki:rireki,
                    year:yyyy,
                    nowmonth:nn,
                    sum:sum,
                    subtotal:subtotal,
                    radioname:radioname,
                }
                res.render('jmkotsuhi3', opt);  

            });//2つ目のclient.query締める
        });//1つ目のclient.query締める
    } //req.body.confirm締める
}) //router.post締める



module.exports = router;