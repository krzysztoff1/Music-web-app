import styles from "./row.module.scss";
import { useAtom } from "jotai";
import { controlCurrentlyPlaying } from "@/atoms/currentlyPlayingAtom";

const Row = ({ item, i, playTrack }) => {
  const [currentlyPlaying] = useAtom(controlCurrentlyPlaying);

  return (
    <article
      onClick={() => playTrack(i)}
      style={{
        opacity: !item.track.preview_url && "50%",
        backgroundColor: `${currentlyPlaying === i ? "red" : "transparent"}`,
      }}
      className={styles.row}
    >
      <p className={styles.track__index}>{i + 1}</p>
      <b>{item.track.name}</b>
      <p>{item.track.artists[0].name}</p>
    </article>
  );
};

export default Row;
