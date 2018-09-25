var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');
var keys = rootPath + '/keys.txt';

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL ||'mongodb://127.0.0.1:27017/Andela',
    //add the secret here for the jwt
    token_secret:process.env.SECRET || 'jwt_'
};
