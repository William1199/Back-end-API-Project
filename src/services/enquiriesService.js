import db from "../models/index";

let getAllEnquiries = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let enquiry = await db.Enquiries.findAll();
            if (enquiry) {
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    enquiry: enquiry
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Can't find any user"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getEnquiryById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {

                let enquiry = await db.Enquiries.findOne({
                    where: { id: id }
                });
                if (enquiry) {
                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        enquiry: enquiry
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Can't find enquiries with this id",
                    });
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing input parameter"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createEnquiry = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let enquiry = await db.Enquiries.create({
                    enquiryName: data.enquiryName,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    country: data.country
                });
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    newEnquiry: enquiry,
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing input parameter",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let editEnquiry = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let enquiry = await db.Enquiries.findOne({
                    where: { id: data.id }
                })
                if (enquiry) {
                    enquiry.enquiryName = data.enquiryName;
                    enquiry.phoneNumber = data.phoneNumber;
                    enquiry.email = data.email;
                    enquiry.country = data.country;
                    await enquiry.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update successfull",
                        enquiry: enquiry
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Can't find this enquiry by id",
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing input parameter!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteEnquiry = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let enquiry = await db.Enquiries.findOne({
                    where: { id: id }
                });
                if (!enquiry) {
                    resolve({
                        errCode: 1,
                        errMessage: "Can't find this enquiry with that id",
                    })
                } else {
                    await db.Enquiries.destroy({
                        where: { id: id }
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "Delete successfull"
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing input parameter!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllEnquiries: getAllEnquiries,
    getEnquiryById: getEnquiryById,
    createEnquiry: createEnquiry,
    editEnquiry: editEnquiry,
    deleteEnquiry: deleteEnquiry
}