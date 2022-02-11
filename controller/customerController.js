const { ObjectId } = require('mongodb')
const mongo = require('../db/mongodb')

module.exports = {
    async index(req, res) {
        try {
            const indexCust =  await mongo.getDb().collection('customer').find().toArray()

            if(indexCust.length == 0) {
                res.status(404).send({
                    status: 404,
                    message: 'Data is Empty'
                })
            }

            res.status(200).json({
                status: 200,
                message: 'Data Found',
                result: indexCust
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                errMsg: error.message
            })
        }
    },

    async createCustomer(req, res) {
        var body = req.body
        try {
            const createCustomer = await await mongo.getDb().collection('customer').insertOne({...body, isConsulted: false, dateTime: Date.now()})

            res.status(200).json({
                status: 200,
                message: 'Succesfully Created',
                result: createCustomer
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                errMsg: error.message
            })
        }
    },

    async editCustomer(req, res) {
        try {
            const findCust = await mongo.getDb().collection('customer').findOne({
                _id: ObjectId(req.params.id)
            })

            if(!findCust) {
                return res.status(400).json({
                    message: 'Data not found',
                    result: {}
                })
            }

            const updateCust = await mongo.getDb().collection('customer').updateOne(
                { _id: ObjectId(req.params.id) }, { $set: req.body })

            res.status(200).json({
                status: 200,
                message: 'Updated Successfully',
                result: updateCust
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                errMsg: error.message
            })
        }
    },

    async getCustomerDetail(req, res) {
        try {
            const findCust = await mongo.getDb().collection('customer').findOne({
                _id: ObjectId(req.params.id)
            })

            if(!findCust) {
                return res.status(400).send({
                    status: 400,
                    message: 'Data not found',
                    result: {}
                })
            }

            res.status(200).json({
                status: 200,
                message: 'Data Found',
                result: findCust
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                errMsg: error.message
            })
        }
    },

    async isConsulted(req, res) {
        var consulted
        try {
            const findCust = await mongo.getDb().collection('customer').findOne({
                _id: ObjectId(req.params.id)
            })

            if(!findCust) {
                return res.status(400).json({
                    message: 'Data not found',
                    result: {}
                })
            }

            if(findCust.isConsulted == false) {
                consulted = true
            } else {
                consulted = false
            }

            const custIsConsulted = await mongo.getDb().collection('customer').updateOne({
                _id: ObjectId(req.params.id)
            }, {
                $set: {
                    isConsulted: consulted
                }
            })
    
            res.status(200).json({
                status: 200,
                message: 'Updated Successfully',
                result: custIsConsulted
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                errMsg: error.message
            })
        }
    },

    async deleteCustomer(req, res) {
        try {
            const findCust = await mongo.getDb().collection('customer').findOne({
                _id: ObjectId(req.params.id)
            })

            if(!findCust) {
                return res.status(400).json({
                    message: 'Data not found',
                    result: {}
                })
            }

            const deleteCust = await mongo.getDb().collection('customer').deleteOne({
                _id: ObjectId(req.params.id)
            })

            res.status(200).json({
                status: 200,
                message: 'Deleted Successfully',
                result: deleteCust
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                errMsg: error.message
            })
        }
    }
}