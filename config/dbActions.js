const mongoose = require('mongoose');
const Staff = require('../models/staffModel');
const MONGOURL = '';

mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;
db.on('error', (err) => console.log('Error establishing a DB connection', err));
// db.once('open', () => console.log ('Connected to DB successfully'));


// Create a new staff record in DB
const createStaff = async (staff) => {
    try {
        await Staff.create(staff);
        console.info('New Staff added...');
        db.close();
    } catch (error) {
        console.info(error);
        db.close();
    }
}

// Find a staff record in DB
const findStaff = async (name) => {
    try {
        const formatName = new RegExp(name, 'i');
        const staff = await Staff.find( {$or: [{firstname: formatName}, {lastname: formatName}] })
        if (staff.length === 0) {
            console.info ('No record found...');
        } else if ( staff.length === 1 ) {
            console.info(staff);
            console.info (`${staff.length} match found...`);
        } else {
            console.info(staff);
            console.info(`${staff.length} matches found...`);
        }
        db.close();
    } catch (error) {
        console.info(error);
        db.close();
    }
}

// List all staff record in DB
const findAllStaffs = async () => {
    try {
        const staffs = await Staff.find();
        console.info(staffs);
        console.info(`${staffs.length} staff record found...`);
        db.close(); 
    } catch (error) {
        console.info(error);
    }
}

// Update staff record in DB
const updateRecord = async (id, staff) => {
    try {
        await Staff.findOneAndUpdate({_id: id}, staff);
        console.info('Staff record updated');
        db.close();
    } catch (error) {
        console.info(error);
        db.close();
    }
}

// Delete staff record in DB
const deleteStaff = async (id) => {
    try {
        await Staff.findByIdAndDelete(id);
        console.info('Staff record deleted');
        db.close();
    } catch (error) {
        console.info(error);
    }
}

// Export functions
module.exports = {
    createStaff,
    findStaff,
    findAllStaffs,
    updateRecord,
    deleteStaff
}