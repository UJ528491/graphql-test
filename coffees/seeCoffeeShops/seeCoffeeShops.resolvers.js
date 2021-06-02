import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { lastId }) =>
      client.coffeeShop.findMany({
        take: 2,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
