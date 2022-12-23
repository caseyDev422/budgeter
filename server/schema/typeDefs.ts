import { gql } from 'apollo-server-express';

const typeDefs = gql`
    ## Types ##
    type Item {
        id: ID,
        billName: String!,
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
        getAllItems: [Item]!,
        getUser: User!
    }

    ## Mutations ##
    type Mutation {
        createItem(billName: String!, amount: Float!, dueDate: String!, hasAutoDraft: Boolean!): Item!,
        updateItem(id: ID!, billName: String, amount: Float, dueDate: String, hasAutoDraft: Boolean): Item,
        deleteItem(id: ID!): String!
        createUser(name: String!, occupation: String!, income: Float!): User!

    }
`

module.exports = { typeDefs };