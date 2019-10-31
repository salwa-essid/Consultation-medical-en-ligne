var RDV = require("../models/RDV");

//AddUser
exports.AddRdv = (rdvEntity, callback) => {
    RDV.create(rdvEntity, function (err, rdv) {
        callback(err, rdv)
    })
}

//Delete
exports.DeleteRdvyId = (id, callback) => {
    RDV.remove({
        Id: id
    }, function (err, success) {
        callback(err, success)
    })
}

exports.DeleteByCreteria = (createria, callback) => {
    RDV.remove(createria, function (err, success) {
        callback(err, success)
    })
}

exports.ListByPsy = (Id, callback) => {
    RDV.find({
        PsyId: Id
    }, function (err, list) {
        callback(err, list)
    })
}

// list all psy rdv where psyId = Id and state is true (confirmed)
exports.ListConfirmedByPsy = (Id, callback) => {
    RDV.find({
        $and: [{
            PsyId: Id
        }, {
            State: true
        }]
    }, (err, rdvs) => {
        callback(err, rdvs)
    })
}

exports.getByCreteria = (creteria, callback) => {
    RDV.find(creteria, (err, rdv) => {
        callback(err, rdv)
    })
}