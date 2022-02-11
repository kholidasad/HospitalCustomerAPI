const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017/hospital'
var db

module.exports = {
    async connect() {
        try {
            const client = new MongoClient(url, {useNewUrlParser: true})
            await client.connect()
            const database = client.db('hospital')
            db = database
        } catch (error) {
            console.log('Error Connecting to Mongo db')
            console.error(error)
        }
    },

    getDb() {
        return db
    }
}