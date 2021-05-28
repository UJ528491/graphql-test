import bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.util";
export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password: newPassword,
        },
        { logedInUser }
      ) => {
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: logedInUser.id,
          },
          data: {
            email,
            name,
            location,
            avatarURL,
            githubUsername,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile",
          };
        }
      }
    ),
  },
};
