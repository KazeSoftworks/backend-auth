const boom = require('@hapi/boom');
const UserService = require('./user.service');
const service = new UserService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

class AuthService {
	constructor() {}
	async getUser(email, password) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized();
		}
		delete user.dataValues.password;
		return user;
	}

	signToken(user) {
		const payload = {
			sub: user.id,
			email: user.email,
			role: user.role,
		};
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
		return {
			user,
			token,
		};
	}

	async sendRecovery(email) {
		const user = await service.findByEmail(email);
		if (!user) {
			console.error('Este correo no existe ', email);
			return { message: 'If mail exists, it was sended' };
		}
		const payload = { sub: user.id };
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
		const link = `http://localhost:3000/recovery?token=${token}`;
		const mail = {
			from: `"Kaze Recuperator 👻" <${config.smtpUser}>`, // sender address
			to: `${user.email}`, // list of receivers
			subject: 'Recuperacion de contraseña', // Subject line
			text: 'Waluigi time', // plain text body
			html: `<b>Ingresa a este link => ${link}</b>`, // html body
		};
		const rta = await this.sendMail(mail);
		return rta;
	}

	async sendMail(infoMail) {
		const transporter = nodemailer.createTransport({
			host: config.smtpHost,
			secure: true,
			port: 465,
			auth: {
				user: config.smtpUser,
				pass: config.smtpPass,
			},
		});

		await transporter.sendMail(infoMail);
		return { message: 'If mail exists, it was sent' };
	}
}
module.exports = AuthService;
