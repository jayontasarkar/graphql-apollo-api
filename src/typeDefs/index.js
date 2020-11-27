import { gql } from 'apollo-server-express';
import authTypeDef from '@typeDefs/auth';
import userTypeDef from '@typeDefs/user';
import taskTypeDef from '@typeDefs/task';

const typeDef = gql`
    scalar DateTime

    type Query {
        _: String
    }

    type Pagination {
        prev: Int
        next: Int
        current: Int
        pages: Int
        total: Int
    }

    type Mutation {
        _: String
    }

    type Subscription {
        _: String
    }
`;

export default [
    typeDef,
    authTypeDef,
    userTypeDef,
    taskTypeDef
];