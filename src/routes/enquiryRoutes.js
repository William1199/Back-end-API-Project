import express from "express";
import enquiryController from "../controllers/enquiriesController";
const router = express.Router();

const initEnquiryRoutes = (app) => {

    //api manage enquiries
    router.get("/api/get-all-enquiries", enquiryController.handleGetAllEnquiries);
    router.get("/api/get-enquiry-by-id", enquiryController.handleGetEnquiryById);
    router.post("/api/create-enquiry", enquiryController.handleCreateEnquiry);
    router.put("/api/edit-enquiry", enquiryController.handleEditEnquiries);
    router.delete("/api/delete-enquiry", enquiryController.handleDeleteUser);

    return app.use("/", router);
}

export default initEnquiryRoutes;