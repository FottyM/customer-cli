const mongoose = require('mongoose');
var pluralize = require('pluralize')
// Promises
mongoose.Promise = global.Promise;

// connect to db
const db = mongoose.connect('mongodb://fotty:password@ds261745.mlab.com:61745/customer-cli', {useMongoClient: true});

// Import model
const Customer = require('./models/customer');

// Add customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer added');
        db.close();
    }).catch(error => {
        console.info(error);
        db.close();
    });
};

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
    }).then(customer => {
        console.info(customer);
        console.info(`${customer.length} ${pluralize('match', customer.length)}`);
        db.close();
    }).catch(error => {
        console.info(error)
    });
};

// Update a customer
const updateCustomer = (_id, customer) => {
    Customer.update({_id}, customer)
        .then(customer => {
            console.info('Cusotmer has been updated');
            db.close();
        }).catch(error => {
        console.error(error);
        db.close();
    });
};

// Delete a customer
const removeCustomer = (_id) => {
    Customer.remove(_id)
        .then(customer => {
            console.info('Cusotmer has been removed');
            db.close();
        }).catch(error => {
        console.error(error);
        db.close();
    });
};

// List customer

const listCustomers = () => {
    Customer.find()
        .then(customers => {
            console.info(customers);
            console.info(`${customers.length} ${pluralize('customer', customers.length)}`);
            db.close();
        })
        .catch(error => {
            console.error(error);
            db.close();
        });
};


// Export All Methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
};
