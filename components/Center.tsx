import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { PlayListInterface } from "../types/PlayListsInterface";

const colors = [
  "from-indigo-500",
  "from-blur-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(colors[0]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((res) => setPlaylist(res.body))
      .catch((err) => console.log("Something went wront! " + err));
  }, [spotifyApi, playlistId]);
  console.log(playlist);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-2 pr-2">
          <img
            src={session?.user?.image as string}
            className="rounded-full w-10 h-10"
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 h-80 bg-gradient-to-b to-black ${color} p-8`}
      >
        <img
          src={playlist?.images?.[0].url}
          alt="Playlist Image"
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <Songs />
    </div>
  );
};

export default Center;
