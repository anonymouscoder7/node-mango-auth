const User = require('../models/user');

// controller function
function index(req, res) {
    // return index page
    res.render('frontend/index');
}


module.exports = {
    index,
};
