#! /usr/bin/env node

const { program } = require ('commander');
const { prompt } = require('inquirer');

const { createStaff, findStaff, findAllStaffs, updateRecord, deleteStaff } = require('../config/dbActions');

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Enter staff first name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter staff last name'
    },
    {
        type: 'input',
        name: 'status',
        message: 'Enter staff employment status'
    },
    {
        type: 'input',
        name: 'cadre',
        message: 'Enter staff cadre'
    },
    {
        type: 'input',
        name: 'dateOfAppointment',
        message: 'Enter staff date of appointment'
    },
    {
        type: 'input',
        name: 'dateOfBirth',
        message: 'Enter staff date of birth'
    }
]

program.version('1.0.0').description('Staff Record Management System');

// Program to create a new record
program
    .command('add')
    .alias('a')
    .description('Create a new staff record')
    .action(() => {
        prompt(questions).then((answer) => createStaff(answer));
    })


// Program to find a staff record
program
    .command('find <name>')
    .alias('f')
    .description('Find staff record')
    .action(name => findStaff(name) );

// Program to list all staff record
program
    .command('findall')
    .alias('l')
    .description('See all staff record')
    .action( () => findAllStaffs() );


// Program to update staff record
program.command('update <id>')
    .alias('u')
    .description('Update staff record')
    .action( (id) => prompt(questions).then((answers) => updateRecord(id, answers)));

// Program to delete record
program.command('delete <id>').alias('d').description('Delete staff record').action( (id) => deleteStaff(id) );

// Parse program
program.parse(process.argv);