require("dotenv").config();
import express from "express";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connection();
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("App is running on the port: " + port);
})




