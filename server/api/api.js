const router = require('express').Router();

router.use('/dash', require('./dash'));

module.exports = router;