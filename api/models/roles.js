const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: String
});

module.exports = mongoose.model('Role', roleSchema);