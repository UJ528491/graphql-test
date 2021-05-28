import { gql } from "apollo-server-core";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      email: String
      name: String
      location: String
      password: String
      avatarURL: String
      githubUsername: String
    ): EditProfileResult!
  }
`;
