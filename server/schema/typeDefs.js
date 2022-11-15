const { gql } = require('apollo-server-express');

const typeDefs = gql`
    ## Types ##
    type Item {
        id: ID,
        name: String!,
        amount: Float!,
        dueDate: String!,
        hasAutoDraft: Boolean!
    }

    type User {
        id: ID,
        name: String!,
        occupation: String!
        income: Float!
    }

    ## Queries ##
    type Query {
        getAllItems: [Item]!
    }

    ## Mutations ##
`

module.exports = { typeDefs };