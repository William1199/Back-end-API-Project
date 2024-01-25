import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing input parameter!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    let message = await userService.handleGetAllUser();
    return res.status(200).json(message);
}

let handleUserByID = async (req, res) => {
    let id = req.body.id;
    let message = await userService.handleGetUserById(id);
    return res.status(200).json(message);
}

let handleCreateUser = async (req, res) => {
    let message = await userService.handleCreateUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let message = await userService.handleEditUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUserById = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing requirement parameters!'
        })
    }
    let message = await userService.handleDeleteUser(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateUser: handleCreateUser,
    handleGetAllUser: handleGetAllUser,
    handleUserByID: handleUserByID,
    handleEditUser: handleEditUser,
    handleDeleteUserById: handleDeleteUserById,
}