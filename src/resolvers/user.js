import { combineResolvers } from 'graphql-resolvers';
import User from '@models/user';
import Task from '@models/task';
import { isAuthenticated } from '@resolvers/middleware';
import PubSub from '@subscription';
import events from '@subscription/events';

const resolver = {
    Query: {
        user: combineResolvers(isAuthenticated, async (_, __, { user }) => {
            try {
                return await User.findById(user.id);
            } catch (error) {
                throw error;
            }
        })
    },
    User: {
        tasks: async ({ id }) => await Task.find({ owner: id })
    },
    Subscription: {
        userCreated: {
            subscribe: () => PubSub.asyncIterator(events.userEvents.USER_CREATED)
        }
    }
};

export default resolver;