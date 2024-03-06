const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userRoles = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'company'
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.USER
    }
});

// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
