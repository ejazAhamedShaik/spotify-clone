import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackState);
  const [songInfo, setSongInfo] = useState<any>();

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then(res => res.json()).catch(err => console.log(err));
        setSongInfo(trackInfo)
      }
    };

    fetchSongInfo();
  }, [currentIdTrack, spotifyApi]);
  return songInfo;
};

export default useSongInfo;
