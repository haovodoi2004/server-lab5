const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Fruits = new Scheme({
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    status: { type: Number },
    image: { type: Array },
    description: { type: String },
    id_distributor: { type: Scheme.Types.ObjectId, ref: 'distributor' },

}, {
    timestamps: true
})
module.exports = mongoose.model('fruit', Fruits)