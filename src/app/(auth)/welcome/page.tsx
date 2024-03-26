import CreateUser from "@/lib/actions/UserActions";
import { currentUser } from "@clerk/nextjs";

const page = async () => {
  const user = await currentUser();

  const userData = {
    userId: user?.id || "",
    username: user?.username || "",
    image: user?.imageUrl || "",
    isRegistered: true,
    choices: [],
  };

  await CreateUser(userData);

  return (
    <div>
      <button>CreateUser</button>
    </div>
  );
};

export default page;
