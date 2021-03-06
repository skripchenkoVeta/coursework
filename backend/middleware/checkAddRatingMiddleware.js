const {Rating, DrivingSchool} = require('./../models/models');

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {drivingschoolId} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await Rating.findOne({where: {drivingschoolId, userId: user.id}});
        const checkDrivingSchools =  await DrivingSchool.findOne({where: {id: drivingschoolId}});

        if (!checkDrivingSchools) {
            return res.json("Product doesn't existing in data base");
        } else if(checkRating && checkDrivingSchools) {
            return res.json("You have left a rating for this product");
        }
        return next();
    } catch (e) {
        return res.status(401).json("Something going wrong in checkAddRatingMiddleware.js");
    }
};

