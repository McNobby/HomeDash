const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

require('./dbconnect')()

const api = require('./api/api')
const Auth = require('./api/auth')
const auth = new Auth()

app.use(express.static('public/static/html'))
app.use('/styles', express.static('public/static/styles'))
app.use('/images', express.static('public/static/images'))
app.use('/js', express.static('public/static/js', {
    setHeaders(res, path, stat){
        res.set('Content-Type', 'text/javascript')
    }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', api)

app.listen(port, (req, res) => {


    if(!auth.adminUserExists()) {
        const {username, password} = auth.getAdminCredentials()
        auth.register(username, password)
        console.log('admin user registered');
    }
    
    console.log(`Server is running on http://localhost:${port}`)
})