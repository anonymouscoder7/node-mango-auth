
const bcrypt = require('bcrypt');
const { db } = require('../models/model');
const passport = require('../middleware/passport-config');

function getLoginPage(req, res) {
    res.render('auth/login', { errorMessage: '' });
}

function getRegisterPage(req, res) {
    res.render('auth/register', { errorMessage: '' });
}

async function registerUser(req, res) {
    const { name, email, password, confirm_password } = req.body;

    try {
        // Check if password and confirm_password match
        if (password !== confirm_password) {
            return res.render('auth/register', { errorMessage: 'Passwords do not match.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'user';

        // Create new user with hashed password
        await db.Users.create({ name, email, role: role, password: hashedPassword });

        // Registration successful, redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function registerCompany(req, res) {
    const { name, email, password, confirm_password } = req.body;

    try {
        // Check if password and confirm_password match
        if (password !== confirm_password) {
            return res.render('auth/register', { errorMessage: 'Passwords do not match.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'company';

        // Create new user with hashed password
        await db.Users.create({ name, email, role: role, password: hashedPassword });

        // Registration successful, redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
}

// function login(req, res, next) {
//     passport.authenticate('local', {
//         successRedirect: '/home',
//         failureRedirect: '/login',
//         failureFlash: true
//     })(req, res, next);
// }
function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // return res.redirect('/login');
            return res.render('auth/login', { errorMessage: 'Invalied Crediantials.' });

        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/home');
        });
    })(req, res, next);
}


function home(req, res) {
    if (req.user && req.user.role === 'admin') {
        res.redirect('/admin/dashboard');
    }
    if (req.user && req.user.role === 'company') {
        res.redirect('/company/dashboard');
    }
    if (req.user && req.user.role === 'user') {
        res.redirect('/user/dashboard');
    } else {
        res.status(403).send('You are not authorized to access this resource.');
    }
}


function logout(req, res) {
    req.logout(function (err) {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
}


module.exports = {
    getLoginPage,
    login,
    getRegisterPage,
    registerUser,
    registerCompany,
    home,
    logout
};
