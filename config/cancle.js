const nodemailer = require('nodemailer')

module.exports = {
	sendMailForCancle: function (response,request,postid){
  const output = `
        <p>You have a new contact requestuest</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>From: BusExpress</li>
          <li>Email: shinminah357159@gmail.com</li>
          <li>Phone: 0333157628</li>
          <li>Vé ${postid} đã hủy</li>
          <li><span>Cảm ơn đã sử dụng dịch vụ</span></li>


        </ul>
        `;

  // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'shinminah357159@gmail.com', // generated ethereal user
            pass: '01649254108'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });

  // setup email data with unicode symbols
      let mailOptions = {
          from: '"Freelancer.com" <shinminah357159@email.com>', // sender addresponses
          to: request.user.email, // list of receivers
          subject: 'BookYourBus', // Subject line
          text: 'Hello world?', // plain text body
          html: output // html body
      };

  // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return response.send({is:false})
          }
          console.log('Sent!')
          response.status(200).send({is:true})
          // response.send({status:true})
      });
}
}