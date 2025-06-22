const express = require('express');
const router = express.Router();
const empController = require('../../handlers/empController');
const verifyJWT = require('../../guards/verifyJWT');
const verifyRoles = require('../../guards/verifyRoles');

router.use(verifyJWT);

router.get('/', empController.getAllEmployees);
router.post('/', verifyRoles('Admin', 'Editor'), empController.createEmployee);
router.put('/:id', verifyRoles('Admin', 'Editor'), empController.updateEmployee);
router.delete('/:id', verifyRoles('Admin'), empController.deleteEmployee);
router.get('/search', empController.searchByDepartment);

module.exports = router;
