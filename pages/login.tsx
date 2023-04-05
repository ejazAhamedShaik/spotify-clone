import React from "react";
import { getProviders, signIn } from "next-auth/react";

interface props {
  [key: string]: string;
}
interface SpotifyProps {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}
interface ProviderProps {
  providers: SpotifyProps[];
}

const Login = ({ providers }: ProviderProps) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-100 justify-center">
      <img
        src={"https://links.papareact.com/9xl"}
        className="w-52 mb-5"
        alt={""}
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className="bg-[#18D160] text-white p-5 rounded-full"
            onClick={() => {
              signIn(provider.id, { callbackUrl: "/" });
            }}
          >
            {"Login with " + provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
