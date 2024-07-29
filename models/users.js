const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
    username: { type: String, unique: true, maxlength: 255 },
    password: { type: String, maxLeght: 255 },
    email: { type: String, unique: true },
    name: { type: String },
    avartar: { type: String },
    available: { type: Boolean, default: false },
}, {
    timestamps: true
}
)

module.exports = mongoose.model('user', Users)