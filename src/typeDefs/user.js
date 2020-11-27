import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [User!]
        user: User!
    }
    type User {
        id: String!
        name: String!
        email: String!
        createdAt: DateTime!
        tasks: [Task!]
    }

    extend type Subscription {
        userCreated: User
    }
`;