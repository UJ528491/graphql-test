import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { category, lastId }) =>
      client.category
        .findUnique({
          where: {
            name: category,
          },
        })
        .shops({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};
