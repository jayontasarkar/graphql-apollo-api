import { skip } from 'graphql-resolvers';
import Task from '@models/task';
import validateObjectId from '@utils/validateObjectId';

export const isAuthenticated = (_, __, { user }) => {
    if (!user) {
        throw new Error('Access denied. Please login to continue');
    }
    return skip;
};

export const isTaskOwner = async (_, { id }, { user }) => {
    try {
        const task = await Task.findById(id);
        if (!task) throw new Error('Task not found.');
        if (task.owner.toString() !== user.id) throw new Error('Not authorized as task owner');
        return skip;
    } catch (error) {
        throw error;
    }
};

export const isObjectId = async (_, { id }) => {
    try {
        if (!validateObjectId(id)) throw new Error('Invalid object id');
        return skip;
    } catch (error) {
        throw error;
    }
};