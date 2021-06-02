import client from "../../client";
import { protectResolver } from "../../users/users.util";
import {
  extractCategories,
  filesHandler,
  extractFilesUrl,
} from "../coffees.utils";

export default {
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _,
        { id, name, latitude, longitude, files, category },
        { loggedInUser }
      ) => {
        try {
          const oldShop = await client.coffeeShop.findFirst({
            where: { id, user_id: loggedInUser.id },
            include: {
              categories: { select: { name: true } },
              photos: { select: { id: true } },
            },
          });
          if (!oldShop) {
            throw new Error("CoffeeShop is not found.");
          }
          let categoryObjs = [];
          let files_url = [];
          let filesObjs = [];

          if (category) {
            categoryObjs = extractCategories(category);
          }
          if (files) {
            files_url = await Promise.all(
              files.map(file => filesHandler(file))
            );
            filesObjs = extractFilesUrl(files_url);
          }
          const shop = await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              latitude,
              longitude,
              ...(filesObjs.length > 0 && {
                photos: {
                  deleteMany: oldShop.photos,
                  connectOrCreate: filesObjs,
                },
              }),
              ...(categoryObjs.length > 0 && {
                categories: {
                  disconnect: oldShop.categories,
                  connectOrCreate: categoryObjs,
                },
              }),
            },
          });
          if (!shop) {
            throw new Error(`CoffeeShop: ${oldShop.name}, cannot be updated.`);
          }
          return {
            ok: true,
          };
        } catch (err) {
          return {
            ok: false,
            error: `${err}`,
          };
        }
      }
    ),
  },
};
