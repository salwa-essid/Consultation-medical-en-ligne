var responsRender = require("../middleware/responseRender");
var userEntity = require("../Entities/User");
var mapper = require("automapper-js");
var ServerMessage = require("../constant/messages");
var ServerErrors = require("../constant/errors");
var Joi = require("@hapi/joi");
var uuid = require("uuid/v4");
var database = require("../data/DBconnect");
var userDataAccess = require("../data/UserDataAccess");
var rdvDataAccess = require("../data/RDVDataAccess")
var bcrypt = require("bcrypt");
var roles = require("../constant/appRoles");
var decoder = require("../tools/AuthorizationDecode")

module.exports = {
  register: (rq, rs, nx) => {
    let UserModel = mapper(userEntity, rq.body);
    const schema = Joi.object().keys({
      Id: Joi.string().optional().allow(""),
      Firstname: Joi.string().required().max(30).min(3).regex(/^[a-zA-Z_ ]+$/),
      Lastname: Joi.string().required().min(3) .max(30).regex(/^[a-zA-Z_ ]+$/),
      Address: Joi.string().required().min(3).max(30),
      Birth: Joi.string().optional().allow(""),
      Role: Joi.string().optional().allow(""),
      IsActive: Joi.boolean().optional(),
      Phone: Joi.string().optional().min(6).max(15),
      Email: Joi.string().email({
          minDomainSegments: 2
        }).required().max(50),
      Password: Joi.string().min(8).max(30).required(),
      CreatedAt: Joi.string().optional().allow(""),
      UpdatedAt: Joi.string().optional().allow("")
    });

    const {
      error,
      value
    } = Joi.validate(rq.body, schema);

    if (error != null) {
      return rs
        .status(400)
        .json(responsRender(error, ServerErrors.INVALID_DATA, ""));
    }
    

    // verify email existance
    database.connectToDb()
    userDataAccess.getByCreteria({
      Email: UserModel.Email
    }, (err, user) => {
      database.disconnect()
      if (err) {
        return rs.status(500).json(responsRender(error, ServerErrors.SERVER_ERROR, ""));
      }
      if (typeof(user[0]) != "undefined") {
        return rs.status(200).json(responsRender(null, ServerErrors.ACCOUNT_ALREADY_EXIST, null))
      } else {
        UserModel.Id = uuid();
    bcrypt.hash(UserModel.Password, 11, (err, password) => {
      if (err) {
        return rs
          .status(500)
          .json(responsRender(error, ServerErrors.SERVER_ERROR, ""));
      }
      UserModel.Password = password;
      UserModel.Role = roles.ADMIN;
      database.connectToDb();
      userDataAccess.AddUser(UserModel, (err, user) => {
        database.disconnect();
        if (err) {
          return rs
            .status(500)
            .json(responsRender(error, ServerErrors.SERVER_ERROR, ""));
        }
        user.Password = null;
        return rs
          .status(200)
          .json(responsRender(user, "", ServerMessage.ACCOUNT_CREATED));
      });
    });
      }
    })
  },

  delete: (rq, rs, nx) => {
    if (typeof (rq.params.id) === "undefined") {
      return rs.status(400).json(responsRender(null, ServerErrors.INVALID_DATA, ""))
    }

    database.connectToDb()
    userDataAccess.DeleteUserById(rq.params.id, function (err, succes) {
      database.disconnect()
      if (err) {
        return rs.status(500).json(responsRender(null, ServerErrors.SERVER_ERROR, ""))
      }
      return rs.status(200).json(responsRender(null, "", ServerMessage.OK))
    })
  },
  list: (rq, rs, nx) => {
    database.connectToDb()
    userDataAccess.ListByRole(roles.ADMIN, (err, list) => {
      database.disconnect()
      if (err) {
        return rs.status(500).json(responsRender(null, ServerErrors.SERVER_ERROR, ""))
      }
      list.forEach(element => {
        element.Password=null
      });
      return rs.status(200).json(responsRender(list, "", ServerMessage.OK))

    })
  },

  getAllRdv:(rq,rs,nx)=>{
    let token = rq.headers.authorization.split(" ")[1];
    let id = decoder.getSubject(token)
    database.connectToDb()
    rdvDataAccess.ListByPsy(id,(err,rdvList)=>{
      database.disconnect()
      if (err) {
        return rs.status(500).json(responsRender(null, ServerErrors.SERVER_ERROR, ""))
      }else{
        return rs.status(200).json(responsRender(rdvList,"",ServerMessage.OK))
      }
    })
  },


};