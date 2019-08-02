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
               user: 'eugen.lefter@gmail.com',
               pass: 'Patric45'
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




app.listen(process.env.PORT || 3000, () => console.log('server started'));