import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/outline";
import { RssIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { PlayListInterface } from "../types/PlayListsInterface";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

const Sidebar = () => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<PlayListInterface[]>([]);
  const [_, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => setPlaylists(res.body.items));
    }
  }, [session, spotifyApi]);

  const handleSignOut = (e: React.MouseEvent<HTMLElement>) => {
    console.log("Logging out...");
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button
          className="flex item-center space-x-2 hover:text-white"
          onClick={handleSignOut}
        >
          <p>Log out</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>search</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex item-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Custom Playlist */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
