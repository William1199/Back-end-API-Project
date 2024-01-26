require("dotenv").config();
import express from "express";
import initUserRoutes from "./routes/userRoutes";
import initOppotunityRoutes from "./routes/OppotunityRoutes";
import initEnquiryRoutes from "./routes/enquiryRoutes";
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TMA Intern Project API Documentation',
            version: '1.0.0',
            description: 'API Documentation for your application',
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ['./src/routes/userRoutes.js', './src/routes/OppotunityRoutes.js', './src/routes/enquiryRoutes.js'],
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initUserRoutes(app);
initOppotunityRoutes(app);
initEnquiryRoutes(app);

connection();
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("App is running on the port: " + port);
})