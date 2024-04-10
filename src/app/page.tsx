"use server ";
import ArticleSection from "@/components/ArticleSection";
import MainSection from "@/components/MainSection";
import { fetchUser } from "@/lib/actions/UserActions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  console.log(user?.id);

  if (!user) return null;

  const userInfo = await fetchUser(user?.id);

  if (!userInfo?.isRegistered) redirect("/welcome");
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-5 md:p-24">
      <MainSection />
    </main>
  );
}
