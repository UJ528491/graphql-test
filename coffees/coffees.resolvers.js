import client from "../client";

export default {
  Category: {
    total_shops: ({ name }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
      }),
  },
};
