import type { GetServerSideProps, NextPage } from "next";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Player from "../components/Player";

const Home = () => {
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
      <div className="sticky bottom-0">
          <Player />
        </div>
    </div>
    // </Suspense>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    //If no user, redirect to login page
    // res.writeHead(307, { Location: "/login" });
    // res.end();

    // return { props: {} };
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Home;
