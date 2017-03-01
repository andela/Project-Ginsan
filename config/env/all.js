var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');
var keys = rootPath + '/keys.txt';
var url = 'mongodb://localhost:27017/Cards-for-humanity';

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL || url,
	jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false
    }
};
