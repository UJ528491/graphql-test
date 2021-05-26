import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    password: String!
    avatarURL: String!
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarURL: String!
      githubUsername: String!
    ): Result
  }
  type Result {
    ok: Boolean!
    error: String
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
