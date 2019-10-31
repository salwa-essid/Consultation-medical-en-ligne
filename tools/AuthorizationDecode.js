const jwt = require('jsonwebtoken');
module.exports = {
    //retrive token role
    getRole: (token) => {
        //decoding token
        if (token) {
            let decoded = jwt.decode(token);
            return decoded.role;
        } else {
            return "ANONYMOUS";
        }
    },
    //retrive token subject
    getSubject: (token) => {
        //decoding token
        if (token) {
            let decoded = jwt.decode(token);
            return decoded.sub;
        } else {
            return "";
        }
    },
    getExpiration: (token) => {
        //decoding token
        if (token) {
            let decoded = jwt.decode(token);
            return decoded.exp;
        } else {
            return 0;
        }
    }
}
