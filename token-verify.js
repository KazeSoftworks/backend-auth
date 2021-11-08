const jwt = require('jsonwebtoken');

const secret = 'lolCat';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDcwNDgyMH0.mLxsjkV5hJQbU_fvkOM8kbZjwSIww9mxOD5XX5t2Jns';

const verifyToken = (token, secret) => {
	return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
