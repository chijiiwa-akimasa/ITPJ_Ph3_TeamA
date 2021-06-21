const { text } = require('express');
var express = require('express');
var nodemailer = require('nodemailer');
const { options } = require('.');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('jmkotsuhi', {

    title: 'JM承認画面' ,
    emp_name:'○○さん',
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


router.post('/',function(req,response,next){

  //確定ボタンが押されたとき
  if(req.body.confirm){

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
        if (error) {
          console.log('失敗');
        } else {
          console.log('成功');
        }
      });
    }

    //status番号はfor文を書く？
    //承認にチェックがあるとき
    for(i=1 ;i<=1000;i++){
    if(req.body.status+i==='1'){
      mailsend('JM承認のお知らせ','申請したレコードがJMによって承認されました');
    }
    //却下にチェックがあるとき
    else if(req.body.status[i]==='2'){
      mailsend('JM却下のお知らせ','申請したレコードがJMによって却下されました。却下理由をご確認のうえ、再申請してください。');
    }
    };

    response.render('jmkotsuhi', {

      title: 'JM承認画面' ,
      emp_name:'○○さん',
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
 }

})

module.exports = router;