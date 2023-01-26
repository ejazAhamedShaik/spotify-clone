import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  console.log(playlist.tracks?.items);
  return (
    <div className="text-white px-8 flex flex-col pb-28">
      {playlist.tracks?.items.map((track: any, i: number) => (
        <Song track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
