import styles from "./trackCard.module.scss";
import { atom, useAtom } from "jotai";
import { controlCurrentlyPlayingIndex } from "@/atoms/currentlyPlayingAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { useEffect } from "react";

const queueAtom = atom();

const TrackCard = ({ item, i, playTrack, playlistTitle, url }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(
    controlCurrentlyPlayingIndex
  );
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);

  useEffect(() => {
    console.log(currentlyPlaying);
  }, [JSON.stringify(currentlyPlaying)]);

  return (
    <article
      onClick={() => {
        playTrack(i);
        setCurrentPlaylist({
          title: playlistTitle,
          url: url,
        });
      }}
      style={{
        outline: `${
          currentPlaylist?.title === playlistTitle && currentlyPlaying === i
            ? "2px #0be881 solid"
            : "2px transparent solid"
        }`,
        opacity: !item.preview_url && "50%",
        backgroundImage: `url(${item.album.images[1].url})`,
      }}
      className={styles.card}
    />
  );
};

export default TrackCard;
