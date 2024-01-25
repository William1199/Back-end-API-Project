import express from "express";
import userController from "../controllers/userController";
import enquiryController from "../controllers/enquiriesController";
import oppotunityController from "../controllers/opotunitiesController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello my man")
    });
    //api manage user
    router.get("/api/get-all-users", userController.handleGetAllUser);
    router.get("/api/get-users-by-id", userController.handleUserByID);
    router.post("/api/login-user", userController.handleLogin);
    router.post("/api/create-user", userController.handleCreateUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUserById);

    //api manage oppotunities
    router.get("/api/get-all-oppotunities", oppotunityController.handleGetAllOppotinities);
    router.get("/api/get-oppotunity-by-id", oppotunityController.handleGetOppotinityById);
    router.post("/api/create-oppotunity", oppotunityController.handleCreateOppotinity);
    router.put("/api/edit-oppotunity", oppotunityController.handleEditOppotinity);
    router.delete("/api/delete-oppotunity", oppotunityController.handleDeleteOppotinity);

    //api manage enquiries
    router.get("/api/get-all-enquiries", enquiryController.handleGetAllEnquiries);
    router.get("/api/get-enquiry-by-id", enquiryController.handleGetEnquiryById);
    router.post("/api/create-enquiry", enquiryController.handleCreateEnquiry);
    router.put("/api/edit-enquiry", enquiryController.handleEditEnquiries);
    router.delete("/api/delete-enquiry", enquiryController.handleDeleteUser);

    return app.use("/", router);
}

export default initWebRoutes;
