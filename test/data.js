
module.exports = {

    generateData:  function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        var user = {
            name: 'test',
            email: text + "@gmail.com",
            username: text,
            password: 'password'

        }

        return user;
    }

};