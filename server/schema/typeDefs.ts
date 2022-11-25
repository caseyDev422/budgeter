import { gql } from 'apollo-server-express';

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
        getAllItems: [Item]!,
        getUser: User!
    }

    ## Mutations ##
    type Mutation {
        createItem(name: String!, amount: Float!, dueDate: String!, hasAutoDraft: Boolean!): Item!,
        createUser(name: String!, occupation: String!, income: Float!): User!

    }
`

module.exports = { typeDefs };