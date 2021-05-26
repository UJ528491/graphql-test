import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      //  check if username or email are already on DB.
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username / email is already taken.");
        }
        //  hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        const account = client.user.create({
          data: {
            username,
            email,
            name,
            location,
            avatarURL,
            githubUsername,
            password: uglyPassword,
          },
        });
        return { ok: true };
      } catch (e) {
        return { ok: false, error: e.message };
      }
      //  save and return the user
    },
  },
};
