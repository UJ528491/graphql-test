import { gql } from "apollo-server";

export default gql`
  type Query {
    seeCategory(category: String!, lastId: Int): [CoffeeShop]
  }
`;
