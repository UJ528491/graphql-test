import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatarURL, githubUsername, password }
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
          console.log(existingUser);
          throw new Error("This username or password is already taken.");
        }
        //  hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
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
      } catch (e) {
        console.log(e);
      }
    },
  },
};
