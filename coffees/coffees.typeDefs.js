import { gql } from "apollo-server";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop
    shop_id: String
    created_at: String!
    updated_at: String!
  }
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User!
    photos: [CoffeeShopPhoto]
    categories: [Category]
    created_at: String!
    updated_at: String!
  }
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int!
    created_at: String!
    updated_at: String!
  }
`;
