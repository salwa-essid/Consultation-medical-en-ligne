/**
 * author       : Hasni Mehdi
 * email        : hmehdi@tryspare.com
 * description  : Access Authorization middleware
 */
const responseRender = require('./responseRender');
const errorsMessages = require('../constant/errors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
module.exports = {
    // access authorization check
    AuthorizationCheck: (rq, rs, nx) => {
        //check authorization header
        try {
            if (typeof (rq.headers.authorization) != "undefined") {
                let token = rq.headers.authorization.split(" ")[1];
                //load ssl public key for signiture
                var cert = fs.readFileSync(process.cwd() + "/cert/jwtRS256.key.pub");
                jwt.verify(token, cert, function (error, decoded) {
                    if (error) {
                        return rs.status(401).json(responseRender({}, errorsMessages.UNAUTHORIZED, ""));
                    } else {
                        if (decoded.auth == "AUTHORIZATION") {
                            nx()
                        } else {
                            return rs.status(401).json(responseRender({}, errorsMessages.UNAUTHORIZED, ""));
                        }
                    }
                })
            } else {
                return rs.status(401).json(responseRender({}, errorsMessages.UNAUTHORIZED, ""));
            }
        } catch (error) {
            console.log(error)
        }
    }
}