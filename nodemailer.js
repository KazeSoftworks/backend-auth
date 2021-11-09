const nodemailer = require('nodemailer');
const { config } = require('./config/config');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	//let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: config.smtpHost,
		secure: true,
		port: 465,
		auth: {
			user: config.smtpUser,
			pass: config.smtpPass,
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"Node Waluigi 👻"<${config.smtpUser}>`, // sender address
		to: config.smtpReciever, // list of receivers
		subject: 'Prueba de waluigi', // Subject line
		text: 'Waluigi time', // plain text body
		html: '<h1>Waluigi time</h1>', // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail().catch((err) => {
	console.log(err);
});
