const Router = require('express');
const router = new Router();
const drivingschoolRouter = require('./drivingschoolRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const ratingRouter = require('./ratingRouter');

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/drivingschool', drivingschoolRouter)
router.use('/rating', ratingRouter)

module.exports = router;
