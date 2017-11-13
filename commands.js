const program = require('commander');
const {addCustomer, findCustomer} = require('./index');

program.version('version 0.1.0-beta').description('I am Batman')

program
  .command('add <firstname> <lastname> <phone> <email>')
  .alias('a')
  .description('Add customer')
  .action((firstname, lastname, phone, email) => {
    addCustomer({firstname, lastname, phone, email});
  });
program
  .command('find <name>')
  .alias('f')
  .description('Find a customer')
  .action(name => findCustomer(name))
program.parse(process.argv);
