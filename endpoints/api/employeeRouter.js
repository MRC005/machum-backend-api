const express = require('express');
const router = express.Router();
const empController = require('../../handlers/empController');
const verifyJWT = require('../../guards/verifyJWT');
const verifyRoles = require('../../guards/verifyRoles');

// Protect all employee routes with JWT
router.use(verifyJWT);

// Public route (if you want to allow search without auth, move this above router.use(verifyJWT))
// router.get('/search', empController.searchByDepartment);

// Get all employees (any authenticated user)
router.get('/', empController.getAllEmployees);

// Create employee (only Admin or Editor)
router.post('/', verifyRoles('Admin', 'Editor'), empController.createEmployee);

// Update employee (only Admin or Editor)
router.put('/:id', verifyRoles('Admin', 'Editor'), empController.updateEmployee);

// Delete employee (only Admin)
router.delete('/:id', verifyRoles('Admin'), empController.deleteEmployee);

// Search by department (authenticated users)
router.get('/search', empController.searchByDepartment);

module.exports = router;
