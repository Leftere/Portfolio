const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

const path = require('path');
const nodemailer = require('nodemailer');

const app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/contact', (req,res, next) => {
    res.render('contact', {layout: false});
})

app.use('/', express.static(path.join(__dirname, 'public')));

//body parser 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//fdsafdsfsdf 
app.post('/send', (req,res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.firstName}</li>
            <li>Company: ${req.body.lastName}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>

        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;


    

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
               type: 'Oauth2',
               user: 'eugen.lefter@gmail.com',
               clientId:'64949659164-e9e4rc11jrq0qcc9eja60oucbuoohegv.apps.googleusercontent.com',
               clientSecret: 'klhiJ1xpQBLaFw1zxlxV10Qk',
               accessToken: "ya29.GltkB2jiIHKHM2Aref-BYRUMS04hOZKVC8R9Ae04gS4sRKcK1xpNGF8PVilQqjfy-w4v6w5hD32q51Sm_YZZmZ5EkwQNa-wkTjvm5jeTsBas9AmB6Xfqg26l0Mq9",
               refreshToken: '1/4rcyrhIjHLjg6KcZd4_ZOpwlYhgoZHsCo74dg6ePTUg',
            //    expires: 1484314697598
           },
           
      });

      let mailOptions = {
        from: '"Fred Foo 👻" <eugen.lefter@gmail.com>', // sender address
        to: "eugen.lefter@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      }

      transporter.sendMail(mailOptions, (error, info) => {
          if(error) {
              return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.render('contact', {layout: false, msg: 'email has been sent'})
      
      })
    
      
console.log(req.body)    
    
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });






app.listen(process.env.PORT || 3000, () => console.log('server started'));