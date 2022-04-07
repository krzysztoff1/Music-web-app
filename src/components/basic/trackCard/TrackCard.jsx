import styles from "./trackCard.module.scss";
import { atom, useAtom } from "jotai";
import { controlCurrentlyPlaying } from "@/atoms/currentlyPlayingAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { useEffect } from "react";

const queueAtom = atom();

const TrackCard = ({ item, i, playTrack, playlistTitle, url }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(
    controlCurrentlyPlaying
  );
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);

  useEffect(() => {
    console.log(currentlyPlaying);
  }, [currentlyPlaying]);

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
    ></article>
  );
};

export default TrackCard;
