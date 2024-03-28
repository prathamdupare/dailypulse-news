import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

import Prefrences from "@/components/Prefrences";

const page = async () => {
  const user = await currentUser();

  const userData = {
    userId: user?.id || "",
    username: user?.username || "",
    image: user?.imageUrl || "",
    isRegistered: true,
  };

  return (
    <div className=" w-full flex flex-col items-center justify-center m-4">
      <div className="flex flex-col items-center gap-3 mb-[40px]">
        <Image
          className="rounded-full"
          src={user?.imageUrl || ""}
          alt="user profile"
          height={78}
          width={78}
        />
        <h2 className="font-bold text-[30px]">Welcome {user?.username}!</h2>

        <p className="text-center">
          Stay Informed, Stay Ahead - Get personalized AI Powered news summaries
          tailored to your interests.
        </p>
      </div>
      <Prefrences user={userData} />
    </div>
  );
};

export default page;
