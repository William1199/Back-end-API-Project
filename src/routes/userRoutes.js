import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

const initUserRoutes = (app) => {

    /**
     * @swagger
     *  component:
     *      schema:
     *          User:
     *              type: object
     *              properties: 
     *                  firstName:
     *                      type : string
     *                  lastName:
     *                      type : string
     *                  badgeID:
     *                      type : integer
     *                  email:
     *                      type : string
     *                  password:
     *                      type : string
     *                  phoneNumber:
     *                      type : integer
     *                  position:
     *                      type : string
     * 
     */


    /**
     * @swagger
     * /api/get-all-users:
     *   get:
     *     summary: Get all users
     *     description: Retrieve a list of all users.
     *     responses:
     *       200:
     *          description: Successful response
     *          content:
     *              application/json:
     *                  schema:
     *                      type: array 
     *                      items: 
     *                          $ref: '@component/schema/User'     
     */
    router.get("/api/get-all-users", userController.handleGetAllUser);

    router.get("/api/get-users-by-id", userController.handleUserByID);
    router.post("/api/login-user", userController.handleLogin);
    router.post("/api/create-user", userController.handleCreateUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUserById);

    return app.use("/", router);
}

export default initUserRoutes;
