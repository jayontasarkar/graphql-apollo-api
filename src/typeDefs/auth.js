import { gql } from 'apollo-server-express';

export default gql`
    type Token {
        token: String!
    }
    # Inputs
    input signUpInput {
        name: String!
        email: String!
        password: String!
    }
    input signInInput {
        email: String!
        password: String!
    }
    # Mutations
    extend type Mutation {
        signup(input: signUpInput): User!
        signin(input: signInInput): Token!
    }
`;