import express from "express";
import Api from "./api/api.js";
import Authentication from "./api/Auth/Authentication.js";
import connectToDB from "./dbconnect.js";
import dotenv from "dotenv";

const app = express();
const auth = new Authentication();

dotenv.config();

app.use(express.static('public/static/html'))
app.use('/styles', express.static('public/static/styles'))
app.use('/images', express.static('public/static/images'))
app.use('/js', express.static('public/static/js', {
    setHeaders(res){
        res.set('Content-Type', 'text/javascript')
    }
}))


app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', new Api().getRouter()) 

connectToDB()

console.log('Creating admin if not already existing');
auth.createAdminIfNotAlreadyExisting(); 


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
