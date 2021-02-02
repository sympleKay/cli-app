const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema ({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    cadre: {
        type: String,
        required: true
    },
    dateOfAppointment: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('staff', staffSchema);