const program = require('commander');
const { prompt } = require('inquirer');
const { addCustomer, findCustomer } = require('./index');

const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: "Customer's first name"
  },
  {
    type: 'input',
    name: 'lastname',
    message: "Customer's last name"
  },
  {
    type: 'input',
    name: 'phone',
    message: "Customer's phone"
  },
  {
    type: 'input',
    name: 'email',
    message: "Customer's email"
  }
]

program.version('version 0.1.0-beta').description('I am Batman');

// program.command('add <firstname> <lastname> <phone> <email>').alias('a').description('Add customer').action((firstname, lastname, phone, email) => {
//   addCustomer({firstname, lastname, phone, email});
// });

program
  .command('add')
  .alias('a')
  .description('Add customer')
  .action(() => {
    prompt( questions ).then( answers => addCustomer( answers ) ).catch( error => console.error(`${error} kept you waiting huh!`))
  })



program.command('find <name>').alias('f').description('Find a customer').action(name => findCustomer(name))
program.parse(process.argv);
