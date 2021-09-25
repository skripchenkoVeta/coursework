const Router = require('express');
const router = new Router();
const drivingschoolController = require('../controllers/drivingschoolController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', drivingschoolController.create)
    .get('/', drivingschoolController.getAll)
    .get('/search', drivingschoolController.getSearchAllDrivingSchoolByName)
    .get('/:id', drivingschoolController.getOne)
    .delete('/:id', checkRole("ADMIN"), drivingschoolController.delete)
    .put('/:id', checkRole("ADMIN"), drivingschoolController.update)

module.exports = router;
