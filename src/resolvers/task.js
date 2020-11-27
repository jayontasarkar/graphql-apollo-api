import { combineResolvers } from 'graphql-resolvers';
import Task from '../models/task';
import User from '../models/user';
import { isAuthenticated, isObjectId, isTaskOwner } from './middleware';

const resolver = {
    Query: {
        tasks: combineResolvers(isAuthenticated, async(_, __, { user }) => {
            try {
                return await Task.find({ owner: user.id });
            } catch (error) {
                throw error;
            }
        }),
        task: combineResolvers(
            isAuthenticated, isObjectId, isTaskOwner,
            async (_, { id }) => {
                try {
                    return await Task.findById(id);
                } catch (error) {
                    throw error;
                }
            }
        ),
        paginatedTasks: async(_, { page=1, limit=5 }, { user }) => {
            try {
                const options = { page, limit, sort: { _id: -1 } };
                const {
                    docs,
                    totalDocs: total,
                    page: current,
                    nextPage: next,
                    prevPage: prev,
                    totalPages: pages
                } = await Task.paginate({ owner: user.id }, options);
                return { docs, pagination: { prev, next, current, pages, total} };
            } catch (error) {
                throw error;
            }
        }
    },
    Task: {
        owner: async ({ owner }, _, { loaders }) => {
            try {
                return await loaders.user.load(owner.toString());
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        createTask: combineResolvers(isAuthenticated, async (_, { input }, ctx) => {
            try {
                const user = await User.findById(ctx.user.id);
                const task = await Task.create({
                    name: input.name,
                    completed: input.completed,
                    owner: user.id
                });
                // user.tasks.push(task);
                return task;
            } catch (error) {
                throw error;
            }
        }),
        updateTask: combineResolvers(
            isAuthenticated, isObjectId, isTaskOwner,
            async (_, { id, input }) => {
                try {
                    return await Task.findByIdAndUpdate(
                        id, { ...input }, { new: true }
                    );
                } catch (error) {
                    throw error;
                }
            }
        ),
        deleteTask: combineResolvers(
            isAuthenticated, isObjectId, isTaskOwner,
            async (_, { id }) => {
                try {
                    const task = await Task.findByIdAndDelete(id);
                    console.log('Task', task);
                    return task;
                } catch (error) {
                    throw error;
                }
            }
        )
    }
};

export default resolver;