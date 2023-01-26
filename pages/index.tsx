import type { GetServerSideProps, NextPage } from "next";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   if (status !== "authenticated" && !session) {
  //     router.push("/login");
  //   }
  // }, [session, status]);
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div>{/* Player */}</div>
      </div>
    // </Suspense>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}

export default Home;
