import Express from 'express';
import DotEnv from 'dotenv';
import cors from 'cors';
import Dataloader from 'dataloader';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '@typeDefs';
import resolvers from '@resolvers';
import { connect } from '@utils/database';
import { verifyUser } from '@utils/verifyUser';
import loaders from '@loaders';

// set env variables
DotEnv.config();

// connect to db
connect();

// app
const app = Express();

// cors middleware
app.use(cors());

// body parser middleware
app.use(Express.json());

// loaders
const userLoader = new Dataloader(keys => loaders.user(keys));

// apollo server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req, connection}) => {
        const contextObj = {};
        if (req) {
            await verifyUser(req);
            contextObj.user = req.user;
        }
        contextObj.loaders = { user: userLoader };
        return contextObj;
    },
    formatError: (error) => {
        return {
            message: error.message
        }
    }
});

apolloServer.applyMiddleware({app, path: '/graphql'});

const PORT = process.env.APP_PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

apolloServer.installSubscriptionHandlers(server);