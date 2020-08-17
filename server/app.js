 const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// -- Allow Cross-Origin Request
app.use(cors())

mongoose.connect('mongodb://gql-user:test123@ds361768.mlab.com:61768/graphql-ninja')
mongoose.connection.once('open', () => {
	console.log('Connected to Database')
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}))

app.listen(4010, () => {
	console.log("Listening for Request on Port 4010...")
})