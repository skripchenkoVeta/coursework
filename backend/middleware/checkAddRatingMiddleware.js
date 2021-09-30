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
            return res.json("Автошкола отсутствует в БД");
        } else if(checkRating && checkDrivingSchools) {
            return res.json("Вы уже поставили рейтинг");
        }
        return next();
    } catch (e) {
        return res.status(401).json("Что-то криптануло ошибку в checkAddRatingMiddleware.js");
    }
};

