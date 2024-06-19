"use server ";
import ArticleSection from "@/components/ArticleSection";
import MainSection from "@/components/MainSection";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/lib/actions/UserActions";
import { SignInButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  console.log(user?.id);

  if (!user)
    return (
      <div className="flex h-screen w-full items-center justify-center px-2">
        <div className="text-center lg:text-start space-y-6">
          <div className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline">Welcome to</span>
              <br />
              <span className="inline bg-gradient-to-r from-blue-600 to-pink-600 text-transparent bg-clip-text">
                DailyPulse News
              </span>{" "}
            </h1>{" "}
          </div>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Stay Ahead, Stay Informed: Your Personalized News Companion{" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Powered by AI!.
            </span>
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 gap-2">
            <Button asChild className="w-full md:w-1/3">
              <SignInButton />
            </Button>

            <a
              href="https://github.com/prathamdupare/dailypulse-news"
              target="_blank"
              className={`w-full md:w-1/3 $`}
            >
              Github
            </a>
          </div>
        </div>
      </div>
    );

  const userInfo = await fetchUser(user?.id);

  if (!userInfo?.isRegistered) redirect("/welcome");
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-5 md:p-24">
      <MainSection />
    </main>
  );
}
