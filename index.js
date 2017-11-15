const mongoose = require('mongoose');
var pluralize = require('pluralize')
// Promises
mongoose.Promise = global.Promise;

// connect to db
const db = mongoose.connect('mongodb://fotty:password@ds261745.mlab.com:61745/customer-cli', { useMongoClient: true });
// mongoose.connection.once('open', function () {
//     console.log('Connected to DB')
// }).on('error', function (error) {
//     console.log(error);
// });

// Import model
const Customer = require('./models/customer');

// Add customer
const addCustomer = (customer) => {
  Customer.create(customer).then(customer => {
    console.info('New Customer added');
    db.close();
  }).catch( error =>{
    console.info(error)
    db.close();
  });
}

// Find Customer

const findCustomer = (name) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  Customer.find({
    $or: [
      {
        firstname: search
      }, {
        lastname: search
      }
    ]
  }).then( customer => {
    console.info(customer);
    console.info(`${customer.length} ${pluralize( 'match', customer.length)}`);
    db.close();
  }).catch( error => {
    console.info(error)
  });
}

// Export All Methods
module.exports = {
  addCustomer,
  findCustomer
}
