#!/usr/bin/env node

const program = require('commander');
const {prompt} = require('inquirer');
const {addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomers} = require('./index');

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: "Customer's first name"
    }, {
        type: 'input',
        name: 'lastname',
        message: "Customer's last name"
    }, {
        type: 'input',
        name: 'phone',
        message: "Customer's phone"
    }, {
        type: 'input',
        name: 'email',
        message: "Customer's email"
    }
];

program.version('version 0.1.0-beta').description('I am Batman');



// Add one customer
program
    .command('add')
    .alias('a')
    .description('Add customer')
    .action(() => {
        prompt(questions)
            .then(answers => addCustomer(answers))
            .catch(error => console.error(`${error} kept you waiting huh!`))
    });

// Find a customer
program
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action(name => findCustomer(name));


// Update a customer
program
    .command('update <_id>')
    .alias('u')
    .description('update customer')
    .action(_id => {
        prompt(questions)
            .then(answers => updateCustomer(_id, answers))
            .catch(error => console.error(error))
    });

//Delete a customer
program
    .command('delete <_id>')
    .alias('d')
    .description('delete customer')
    .action(_id => removeCustomer(_id));

//Find all customers
program
    .command('list')
    .alias('l')
    .description('Find all customers')
    .action(() => listCustomers());


program.parse(process.argv);
