import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingSong } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingSong);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();
  const [previewUrl, setPreviewUrl] = useState("");

  console.log(songInfo);

  const fetchCurrentSong = () => {
    // if (!songInfo) {
    //   spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    //     console.log("Now playing ", data);
    //     setCurrentIdTrack(data.body?.item?.id as any);
    //   });
    //   spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //     setIsPlaying(data.body?.is_playing);
    //   });
    // }
  };
  console.log(previewUrl);
  useEffect(() => {
    // fetchCurrentSong();
    // setPreviewUrl(() =>
    //   songInfo.preview_url !== null ? songInfo.preview_url : ""
    // );
    setVolume(50);
  }, [previewUrl]);

  return (
    <div>
      {/* Left */}
      <div>
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <audio controls>
          <source src={previewUrl} type="audio/mpeg" />
          <source src="horse.mp3" type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </div>
  );
};

export default Player;
