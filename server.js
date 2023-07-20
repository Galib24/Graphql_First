const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema
} = require('graphql')

const app = express()

const PORT = 5000

// data
const books = [
    {
        title: 'death home',
        author: 'Jon',
        published: '2010',
        publisher: 'michel',
        pages: 1,


    }

]

const bookType = new GraphQLObjectType({
    name: 'books',
    description: 'this showed details about books',
    fields: () => ({
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        published: { type: GraphQLNonNull(GraphQLString) },
        publisher: { type: GraphQLNonNull(GraphQLString) },
        pages: { type: GraphQLNonNull(GraphQLInt) }
    })
})

// query
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(bookType),
            description: 'list of all details about books',
            resolve: ()=> books
        }
    })
})

// schema variable
const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))
app.listen(PORT, () => {
    console.log(`server running ${PORT}`)
})