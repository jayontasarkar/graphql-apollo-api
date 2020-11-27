import { GraphQLDateTime } from 'graphql-iso-date';
import authResolver from '@resolvers/auth';
import userResolver from '@resolvers/user';
import taskResolver from '@resolvers/task';

const dateTimeScalarResolver = {
    DateTime: GraphQLDateTime
}

export default [
    dateTimeScalarResolver,
    authResolver,
    userResolver,
    taskResolver
];