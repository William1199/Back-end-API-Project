import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserByEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attribute: ['email', 'password'],
                    raw: true,
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 1;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User is not exist in your system. Please try again!";
                }
            } else {
                userData.errCode = 3;
                userData.errMessage = "User is not exist in your system. Please try again!";
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll();
            if (user) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    user: user,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Can't find any user in system"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let user = await db.User.findOne({
                    where: { id: id }
                });
                if (!user) {
                    resolve({
                        errCode: 1,
                        errMessage: "Can't find this user with id in system",
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        user: user,
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing input Parameter"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let check = await checkUserByEmail(data.email);
                console.log(check);
                if (check) {
                    resolve({
                        errCode: 1,
                        errMessage: 'this user is already in system, try again'
                    });
                } else {
                    let hashPasswordFromByCrypt = await hashUserPassword(data.password);
                    let newUser = await db.User.create({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        badgeID: data.badgeID,
                        email: data.email,
                        password: hashPasswordFromByCrypt,
                        phoneNumber: data.phoneNumber,
                        position: data.position,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: 'OK',
                        user: newUser,
                    });
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

let handleEditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing require parameter!'
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                let hashPassword = await hashUserPassword(data.password);

                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.badgeID = data.badgeID;
                user.password = hashPassword;
                user.phoneNumber = data.phoneNumber;
                user.position = data.position;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Edit user successfully!",
                    user: user
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleDeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let user = await db.User.findOne({
                    where: { id: id }
                });
                if (!user) {

                    resolve({
                        errCode: 1,
                        errMessage: "Can't find user"
                    });
                }
                await db.User.destroy({
                    where: { id: id }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Delete User Succeccfull!"
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

module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetAllUser: handleGetAllUser,
    handleGetUserById: handleGetUserById,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}