const bcrypt = require('bcrypt');

const hashPassword = async () => {
	const myPassword = 'admin 123 .202';
	const storedHash =
		'$2b$10$/FNcOxVPmB7ok1c9GB2em.kM0uZcBTaBb0P0nIEyp2fT6wG/NdqWW';
	const isMatch = await bcrypt.compare(myPassword, storedHash);
	console.log(isMatch);
};

hashPassword();
