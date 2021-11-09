require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'dev',
	isProd: process.env.NODE_ENV === 'production',
	port: process.env.PORT || 3000,
	dbUrl: process.env.DATABASE_URL,
	apiKey: process.env.API_KEY,
	jwtSecret: process.env.JWT_SECRET,
	smtpHost: process.env.SMTP_HOST,
	smtpUser: process.env.SMTP_USER,
	smtpPass: process.env.SMTP_PASS,
	smtpReciever: process.env.SMTP_RECIEVER,
};

module.exports = { config };
