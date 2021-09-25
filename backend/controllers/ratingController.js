const {Rating, DrivingSchool} = require('./../models/models');
const jwt = require('jsonwebtoken');

class RatingController {
    async addRating(req, res) {
        try {
            const {rate, drivingschoolId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            await Rating.create({rate, drivingschoolId, userId: user.id});

            let rating = await Rating.findAndCountAll({
                where: {
                    drivingschoolId
                },
            });

            let allRating = 0;
            let middleRating;
            rating.rows.forEach(item => allRating += item.rate);
            middleRating = Number(allRating) / Number(rating.count);

            await DrivingSchool.update(
                {rating: middleRating},
                {where: {id: drivingschoolId}}
            );

            return res.json("Rating success added");
        } catch (e) {
            console.error(e);
        }
    }
    

    async checkRating(req, res) {
        try {
            const {drivingschoolId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const checkRating = await Rating.findOne({where: {drivingschoolId, userId: user.id}});
            const checkDrivingSchools =  await DrivingSchool.findOne({where: {id: drivingschoolId}});
            if (!checkDrivingSchools) {
                return res.json({allow: false});
            } else if(checkRating && checkDrivingSchools) {
                return res.json({allow: false});
            }
            return res.json({allow: true});
        } catch (e) {
            return res.status(401).json("Something going wrong in checkAddRatingMiddleware.js");
        }
    }
}

module.exports = new RatingController();
