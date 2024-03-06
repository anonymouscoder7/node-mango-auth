const User = require('../models/user');

async function dashboard(req, res) {
    // const users = await User.find();
    // console.log(users);
    res.render('user/dashboard');
}


module.exports = {
    dashboard,
};
