var responsRender = require("../middleware/responseRender");
var mapper = require("automapper-js");
var loginEntity = require("../Entities/Login")
var ServerMessage = require("../constant/messages");
var ServerErrors = require("../constant/errors");
var Joi = require("@hapi/joi");
var database = require("../data/DBconnect");
var userDataAccess = require("../data/UserDataAccess");
var bcrypt = require("bcrypt");
var roles = require("../constant/appRoles");
var fs = require("fs")
var jwt = require("jsonwebtoken")

module.exports = {
  psyLogin: (rq, rs, nx) => {
    let loginModel = mapper(loginEntity, rq.body)
    const schema = Joi.object().keys({
      Email: Joi.string().email({
        minDomainSegments: 2
      }).required().max(50),
      Password: Joi.string().min(8).max(30).required(),
    });

    const {
      error,
      value
    } = Joi.validate(rq.body, schema);

    if (error != null) {
      return rs
        .status(200)
        .json(responsRender(error, ServerErrors.INVALID_CREDENTIALS, ""));
    }

    // loginModel.Password = pass
    database.connectToDb()
    userDataAccess.getByCreteria({
      Email: loginModel.Email
    }, (err, user) => {
      database.disconnect()
      if (err) {
        return rs
          .status(500)
          .json(responsRender(error, ServerErrors.SERVER_ERROR, ""));
      } else {
        if (typeof (user[0]) != "undefined") {
          if (user[0].Role != roles.PSY) {
            return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
          } else {
            bcrypt.compare(loginModel.Password, user[0].Password, (err, success) => {
              if (err) {
                return rs
                  .status(500)
                  .json(responsRender(error, ServerErrors.INVALID_CREDENTIALS, ""));
              } else if (success) {
                //load ssl private key for signiture
                var privateKey = fs.readFileSync(process.cwd() + "/cert/jwtRS256.key");

                // token expiration time 
                const tokenExpireTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24);

                //generate signed authorization token token
                var token = jwt.sign({
                  iss: process.env.APP_URL,
                  exp: tokenExpireTime,
                  nbf: 1000,
                  auth: "AUTHORIZATION",
                  iat: Date.now(),
                  sub: user[0].Id,
                  role: roles.PSY
                }, privateKey.toString(), {
                  algorithm: 'RS256'
                });
                rs.status(200).json(responsRender(token, "", ServerMessage.OK))
              } else {
                return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
              }
            })
          }

        } else {
          return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
        }

      }
    })
  },

  patientLogin : (rq, rs, nx) => {
    let loginModel = mapper(loginEntity, rq.body)
    const schema = Joi.object().keys({
      Email: Joi.string().email({
        minDomainSegments: 2
      }).required().max(50),
      Password: Joi.string().min(8).max(30).required(),
    });

    const {
      error,
      value
    } = Joi.validate(rq.body, schema);

    if (error != null) {
      return rs
        .status(200)
        .json(responsRender(error, ServerErrors.INVALID_CREDENTIALS, ""));
    }

    // loginModel.Password = pass
    database.connectToDb()
    userDataAccess.getByCreteria({
      Email: loginModel.Email
    }, (err, user) => {
      database.disconnect()
      if (err) {
        return rs
          .status(500)
          .json(responsRender(error, ServerErrors.SERVER_ERROR, ""));
      } else {
        if (typeof (user[0]) != "undefined") {
          if (user[0].Role != roles.PATIENT) {
            return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
          } else {
            bcrypt.compare(loginModel.Password, user[0].Password, (err, success) => {
              if (err) {
                return rs
                  .status(500)
                  .json(responsRender(error, ServerErrors.INVALID_CREDENTIALS, ""));
              } else if (success) {
                //load ssl private key for signiture
                var privateKey = fs.readFileSync(process.cwd() + "/cert/jwtRS256.key");

                // token expiration time 
                const tokenExpireTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24);

                //generate signed authorization token token
                var token = jwt.sign({
                  iss: process.env.APP_URL,
                  exp: tokenExpireTime,
                  nbf: 1000,
                  auth: "AUTHORIZATION",
                  iat: Date.now(),
                  sub: user[0].Id,
                  role: roles.PATIENT
                }, privateKey.toString(), {
                  algorithm: 'RS256'
                });
                rs.status(200).json(responsRender(token, "", ServerMessage.OK))
              } else {
                return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
              }
            })
          }

        } else {
          return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
        }
      }
    })
  },



  admintLogin : (rq, rs, nx) => {
    let loginModel = mapper(loginEntity, rq.body)
    const schema = Joi.object().keys({
      Email: Joi.string().email({
        minDomainSegments: 2
      }).required().max(50),
      Password: Joi.string().min(8).max(30).required(),
    });

    const {
      error,
      value
    } = Joi.validate(rq.body, schema);

    if (error != null) {
      return rs
        .status(200)
        .json(responsRender(error, ServerErrors.INVALID_CREDENTIALS, ""));
    }

    // loginModel.Password = pass
    database.connectToDb()
    userDataAccess.getByCreteria({
      Email: loginModel.Email
    }, (err, user) => {
      database.disconnect()
      if (err) {
        return rs
          .status(500)
          .json(responsRender(error, ServerErrors.SERVER_ERROR, ""));
      } else {
        if (typeof (user[0]) != "undefined") {
          if (user[0].Role != roles.ADMIN) {
            return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
          } else {
            bcrypt.compare(loginModel.Password, user[0].Password, (err, success) => {
              if (err) {
                return rs
                  .status(500)
                  .json(responsRender(error, ServerErrors.INVALID_CREDENTIALS, ""));
              } else if (success) {
                //load ssl private key for signiture
                var privateKey = fs.readFileSync(process.cwd() + "/cert/jwtRS256.key");

                // token expiration time 
                const tokenExpireTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24);

                //generate signed authorization token token
                var token = jwt.sign({
                  iss: process.env.APP_URL,
                  exp: tokenExpireTime,
                  nbf: 1000,
                  auth: "AUTHORIZATION",
                  iat: Date.now(),
                  sub: user[0].Id,
                  role: roles.ADMIN
                }, privateKey.toString(), {
                  algorithm: 'RS256'
                });
                rs.status(200).json(responsRender(token, "", ServerMessage.OK))
              } else {
                return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
              }
            })
          }

        } else {
          return rs.status(200).json(responsRender(null, ServerErrors.INVALID_CREDENTIALS, ""))
        }
      }
    })
  }
}