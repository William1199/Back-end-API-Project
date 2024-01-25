import enquiryService from "../services/enquiriesService";

let handleGetAllEnquiries = async (req, res) => {
    let message = await enquiryService.getAllEnquiries();
    return res.status(200).json(message);
}

let handleGetEnquiryById = async (req, res) => {
    let message = await enquiryService.getEnquiryById(req.body.id);
    return res.status(200).json(message);
}

let handleCreateEnquiry = async (req, res) => {
    let message = await enquiryService.createEnquiry(req.body);
    return res.status(200).json(message);
}

let handleEditEnquiries = async (req, res) => {
    let message = await enquiryService.editEnquiry(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let message = await enquiryService.deleteEnquiry(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllEnquiries: handleGetAllEnquiries,
    handleGetEnquiryById: handleGetEnquiryById,
    handleCreateEnquiry: handleCreateEnquiry,
    handleEditEnquiries: handleEditEnquiries,
    handleDeleteUser: handleDeleteUser,
}