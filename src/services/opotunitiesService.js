import db from "../models/index";

let getAllOppotunities = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let opp = await db.Oppotunities.findAll();
            if (opp) {
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    opp: opp
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Can't find any user"
                })
            }
        } catch (e) {
            console.error("Error in getAllOppotunities:", e);
            reject(e);
        }
    })
}

let getOppotunityById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let opp = await db.Oppotunities.findOne({
                    where: { id: id }
                });
                if (opp) {
                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        oppById: opp,
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Can't find anything with this id"
                    });
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing input parameter"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createOppotunity = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let newOpp = await db.Oppotunities.create({
                    oppotinityName: data.oppotinityName,
                    oppId: data.oppId,
                    partner: data.partner,
                    product_Service: data.product_Service,
                    stago: data.stago,
                    company: data.company,
                });
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    opp: newOpp,
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing input parameter"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let editOppotunity = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let opp = await db.Oppotunities.findOne({
                    where: { id: data.id }
                });
                if (opp) {
                    opp.oppotunityName = data.oppotunityName;
                    opp.oppId = data.oppId;
                    opp.partner = data.partner;
                    opp.product_Service = data.product_Service;
                    opp.stago = data.stago;
                    opp.company = data.company;
                    await opp.save();
                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        opp: opp,
                    });

                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Can't find this Oppotunities in the system"
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Mising input parameter",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteOppotunity = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let opp = await db.Oppotunities.findOne({
                    where: { id: id }
                });
                if (opp) {
                    await db.Oppotunities.destroy({
                        where: { id: id }
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "Delete success"
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Can't find this Oppotunities in system"
                    });
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Mising input parameter",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllOppotunities: getAllOppotunities,
    getOppotunityById: getOppotunityById,
    createOppotunity: createOppotunity,
    editOppotunity: editOppotunity,
    deleteOppotunity: deleteOppotunity,
}