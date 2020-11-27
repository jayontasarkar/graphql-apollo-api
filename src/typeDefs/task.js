import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        tasks: [Task!]!
        paginatedTasks(page: Int, limit: Int): TaskCollection!
        task(id: String!): Task!
    }
    type TaskCollection {
        docs: [Task!]!
        pagination: Pagination!
    }
    type Task {
        id: ID!
        name: String!
        completed: Boolean!
        createdAt: DateTime!
        owner: User!
    }
    # Mutations
    extend type Mutation {
        createTask(input: createTaskInput!): Task!
        updateTask(id: ID!, input: updateTaskInput!): Task!
        deleteTask(id: ID!): Task
    }
    # Inputs
    input createTaskInput {
        name: String!
        completed: Boolean!
    }
    input updateTaskInput {
        name: String
        completed: Boolean
    }
`;