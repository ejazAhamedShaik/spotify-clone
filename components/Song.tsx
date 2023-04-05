import React, { useState } from "react";
import millisToMinutesAndSeconds from "../lib/time";
import { isPlayingSong, currentTrackState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";

const Song = ({ track, order }: any) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [isSongPlaying, setIsSongPlaying] = useRecoilState(isPlayingSong);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsSongPlaying(!isSongPlaying);
    // spotifyApi.play({
    //   // context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    //   uris: [track.track.preview_url],
    // });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 cursor-pointer rounded-lg"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt="Song image"
        />
        <div>
          <p className="text-white truncate">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
