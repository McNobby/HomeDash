import express from "express";
import Api from "./api/api.js";
import Authentication from "./api/Auth/Authentication.js";
import DB from "./dbconnect.js";

import dotenv from "dotenv";
import cors from "cors";

const port = process.env.PORT || 9000;

const app = express();
const auth = new Authentication();

dotenv.config();

app.use(cors({
    origin: '*', // <- only during development
}))

app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', new Api().getRouter()) 

DB.connect().then(() => {

    console.log('Creating admin if not already existing');

    auth.createAdminIfNotAlreadyExisting(); 

    app.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}/`)
    })
})