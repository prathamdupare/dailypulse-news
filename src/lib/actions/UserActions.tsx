import User from "../models/UserModel";
import { connectToDb } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  image: string;
  isRegistered: boolean;
  choices: any[];
}
const CreateUser = async ({
  userId,
  username,
  image,
  isRegistered,
  choices,
}: Params) => {
  try {
    await connectToDb();

    const newUser = await User.create({
      id: userId,
      username: username,
      image: image,
      isRegistered: isRegistered,
      choices: choices,
    });

    console.log("User created successfully", newUser);
  } catch (error: any) {
    console.log("Error creating User", error.message);
  }
};

export default CreateUser;
