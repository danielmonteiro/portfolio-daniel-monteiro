var express = require('express');
var ses = require('node-ses');
require('dotenv').load();

var router = express.Router();
var client = ses.createClient({ key: process.env.SES_KEY, secret: process.env.SES_SECRET });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST send email from contact form */
router.post('/send-message', function(req, res, next) {

  var emailContent = `
    <html>
      <body style="background: #E5E5E5; padding-bottom: 30px; font-size: 16px;">
        <div style="background: white; margin: 0 10%; padding: 15px 30px 20px; border-top: solid 10px #0069d9;">
          <h1 style="font-size: 2.0rem; margin: 1.5rem 0; line-height: 1.4; font-weight: 700;">Daniel Pinho Monteiro</h1>
          <p><strong>Name</strong>: ${req.body.name}</p>
          <p><strong>E-mail</strong>: ${req.body.email}</p>
          <p><strong>Website</strong>: ${req.body.website}</p>
          <p><strong>Phone</strong>: ${req.body.phone}</p>
          <p><strong>Message</strong>: ${req.body.message}</p>
        </div>
      </body>
    </html>
  `;

  // Send email
  client.sendEmail({
    to: 'danielpinhomonteiro@gmail.com'
    , from: 'danielpinhomonteiro@gmail.com'
    , subject: 'Daniel Pinho Monteiro - New Contact Received'
    , message: emailContent
  }, function () {
    
  });

  res.status(200).json({ status: 'OK' });

});

module.exports = router;
