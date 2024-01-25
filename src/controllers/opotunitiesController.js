import oppotunityService from "../services/opotunitiesService";

let handleGetAllOppotinities = async (req, res) => {
    let message = await oppotunityService.getAllOppotunities();
    return res.status(200).json(message);
}

let handleGetOppotinityById = async (req, res) => {
    let message = await oppotunityService.getOppotunityById(req.body.id);
    return res.status(200).json(message);
}

let handleCreateOppotinity = async (req, res) => {
    let message = await oppotunityService.createOppotunity(req.body);
    return res.status(200).json(message);
}

let handleEditOppotinity = async (req, res) => {
    let message = await oppotunityService.editOppotunity(req.body);
    return res.status(200).json(message);
}

let handleDeleteOppotinity = async (req, res) => {
    let message = await oppotunityService.deleteOppotunity(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllOppotinities: handleGetAllOppotinities,
    handleGetOppotinityById: handleGetOppotinityById,
    handleCreateOppotinity: handleCreateOppotinity,
    handleEditOppotinity: handleEditOppotinity,
    handleDeleteOppotinity: handleDeleteOppotinity,
}