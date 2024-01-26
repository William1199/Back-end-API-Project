import express from "express";
import oppotunityController from "../controllers/opotunitiesController";
const router = express.Router();

const initOppotunityRoutes = (app) => {
    //api manage oppotunities
    router.get("/api/get-all-oppotunities", oppotunityController.handleGetAllOppotinities);
    router.get("/api/get-oppotunity-by-id", oppotunityController.handleGetOppotinityById);
    router.post("/api/create-oppotunity", oppotunityController.handleCreateOppotinity);
    router.put("/api/edit-oppotunity", oppotunityController.handleEditOppotinity);
    router.delete("/api/delete-oppotunity", oppotunityController.handleDeleteOppotinity);

    return app.use("/", router);
}

export default initOppotunityRoutes;