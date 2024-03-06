function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).send('You are not authorized to access this resource.');
}

function isCompany(req, res, next) {
    if (req.user && req.user.role === 'company') {
        return next();
    }
    res.status(403).send('You are not authorized to access this resource.');
}


module.exports = { isAuthenticated, isAdmin, isCompany };
