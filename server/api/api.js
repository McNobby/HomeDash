const router = require('express').Router();
const Auth = require('./auth');
const auth = new Auth();

router.use("/dash", (req, res, next) => {
    if(auth.verifyJWT(req, res, next))
    {
        next()
    }
})

router.use('/dash', require('./dash'));
router.use('/auth', auth.getRouter() );

module.exports = router;