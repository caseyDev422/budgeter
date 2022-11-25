

// const { ApolloServer } = require('apollo-server-express');
import { ApolloServer } from "apollo-server-express";
const { resolvers } = require('../schema/resolvers');
const { typeDefs } = require('../schema/typeDefs');
import express from 'express';
import cors from 'cors';

async function startApolloServer(typeDefs: any, resolvers: any) {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    const app = express();
    app.use(cors());
    app.use(express.json());
    await server.start();
    server.applyMiddleware({app});

    app.listen(8080, () => {
        console.log(`Server is listening on port 8080${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);