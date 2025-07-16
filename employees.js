const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewemployee);
  .put(employeesController.updateEmployees)
  .delete(demployeesController.eleteEmployee);

  router.route('/:id')
  .get(employeesController.getEmployeeById)

  module.exports = router;