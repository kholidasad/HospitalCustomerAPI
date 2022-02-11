var express = require('express');
var router = express.Router();
const Customer = require('../controller/customerController')

router.get('/', Customer.index)
router.post('/', Customer.createCustomer)
router.get('/:id', Customer.getCustomerDetail)
router.post('/:id', Customer.editCustomer)
router.put('/:id', Customer.isConsulted)
router.delete('/:id', Customer.deleteCustomer)

module.exports = router;
