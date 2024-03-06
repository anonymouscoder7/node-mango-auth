// routes/routes.js
const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const authController = require('../controllers/authController');
const adminController  = require('../controllers/adminController');
const companyController  = require('../controllers/companyController');
const userController  = require('../controllers/userController');


const { isAuthenticated, isAdmin,isCompany } = require('../middleware/authMiddleware');

// auth routes
router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);
router.get('/register', authController.getRegisterPage);
router.post('/user-register', authController.registerUser);
router.post('/company-register', authController.registerCompany);



router.get('/home', [isAuthenticated],authController.home);

// Logout route
router.get('/logout', authController.logout);

// frontend routes
router.get('/', frontendController.index);

// admin routes
router.get('/admin/dashboard',[isAuthenticated,isAdmin],adminController.dashboard);


// company routes
router.get('/company/dashboard',[isAuthenticated,isCompany],companyController.dashboard);


// user routes
router.get('/user/dashboard',[isAuthenticated],userController.dashboard);

module.exports = router;
