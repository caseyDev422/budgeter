const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../schema/resolvers');
const { typeDefs } = require('../schema/typeDefs');
const  express = require('express');

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    const app = express();
    await server.start();
    server.applyMiddleware({app});

    app.listen(PORT = 8080, () => {
        console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);