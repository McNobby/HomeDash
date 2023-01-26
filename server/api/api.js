const router = require('express').Router();
const Auth = require('./auth');
const auth = new Auth();

const Dash = require('./dash')

router.use("/dash", (req, res, next) => {
    if(auth.verifyJWT(req, res, next))
    {
        next()
    }
    else {

        return res.status(401).json({message: 'Invalid token!'})
    }
})

const dashApi = new Dash(auth)
router.use('/dash', dashApi.getRoutes());
router.use('/auth', auth.getRouter() );

module.exports = router;