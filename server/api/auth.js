module.exports = class Auth {

    constructor() {
        this.router = require('express').Router()
        this.User = require('../../schemas/UserSchema')
        this.bcrypt = require('bcrypt')
        this.routesBuilt = false
        this.jwt = require('jsonwebtoken')
    }

    getRouter() {
        if (!this.routesBuilt) {
            this.buildRoutes()
        }
        return this.router
    }

    buildRoutes() {
        this.router.post('/login', (req, res) => {
            let username = req.body.username
            let password = req.body.password
            
            if (!username || !password) {
                return res.status(400).json({
                    message: 'username and password is required'
                })
            }

            this.login(username, password).then(userid => {
                if (userid) {
                    res.json({
                        success: true,
                        token: this.getJWT(userid)
                    })
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid credentials'
                    })
                }
            })
        })


        this.router.use((req, res, next) => {
            this.userId = this.verifyJWT(req, res)
            if(this.userId) next()
            // else res.status(401).json({message: 'Unauthorized'})
        })


        this.router.post('/register', (req, res) => {
            
            if (!this.isUserAdmin(this.userId)) {
                return res.status(401).json({
                    message: 'Unauthorized - only admin can register new users'
                })
            }

            let username = req.body.username
            let password = req.body.password

            if (!username || !password) {
                return res.status(400).json({
                    message: 'username and password is required'
                })
            }

            this.register(username, password).then(userid => {
                if (userid) {
                    res.status(200).json({
                        success: true,
                        userid: userid
                    })
                } else {
                    res.status(500).json({
                        success: false,
                        message: 'Internal error'
                    })
                }
            })

        })
        

        this.routesBuilt = true
    }

    /**
     * Login user
     * 
     * Returns userid if credentials are valid, false otherwise
     * 
     * @param {String} username username to check
     * @param {String} password password to check
     * 
     * @returns {String|Boolean} userid if credentials are valid, false otherwise
     */
    login(username, password) {
        console.log(username);
        return this.User.findOne({
            username: username
        }).then(user => {
            console.log(user);
            if(!user) {
                return false
            }

            if (this.isPasswrdCorrect(password, user.password)) {
                return user._id
            }

            return false
        })
    }


    adminUserExists() {
        return this.User.findOne({
            username: process.env.ADMIN_USERNAME || 'admin'
        }).then(user => {
            return !!user
        })
    }


    register(username, password) {
        // hash password
        let hash = this.getHasedPassword(password)

        return new this.User({
            username: username,
            password: hash
        })
        .save().then((user) => {
            console.log(`User ${user.username} registered (${user._id})`)
            return user._id
        })
        .catch(err => {
            console.log(err)
            return false
        })
    }


    isUserAdmin(userid) {
        return this.User.findOne({
            _id: userid
        }).then(user => {
            return user.username === this.getAdminCredentials().username
        })
    }


    getAdminCredentials() {
        return {
            username: process.env.ADMIN_USERNAME || 'admin',
            password: process.env.ADMIN_PASSWORD || 'admin'
        }
    }


    getHasedPassword(password) {
        let salt = this.bcrypt.genSaltSync(16)
        let hash = this.bcrypt.hashSync(password, salt)
        return hash
    }


    isPasswrdCorrect(password, hash) {
        return this.bcrypt.compareSync(password, hash)
    }


    getJWT(userid) {
        return this.jwt.sign({
            userid: userid
        }, 
        process.env.AUTH_SECRET,
        {
            algorithm: 'HS512',
            expiresIn: '30d'
        })
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @returns 
     */
    verifyJWT(req, res) {
        
        if(!req.headers.authorization)
        {
            return res.status(401).json({
                message: 'No token provided'
            })
        }

        let token = req.headers.authorization.split(' ')[1]

        try{
            let decoded = this.jwt.verify(token, process.env.AUTH_SECRET, {
                algorithms: ['HS512']
            })
            return decoded.userid
        }
        catch(err){
            res.status(401).json({message: err.message})
            return
        }
        
    }


}