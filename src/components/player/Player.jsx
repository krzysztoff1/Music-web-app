import { updatePlaying } from "@/atoms/playerAtom";
import { useAtom } from "jotai";
import styles from "./player.module.scss";

const Player = () => {
  const [song, changeSong] = useAtom(updatePlaying);
  return (
    <section className={styles.container}>
      <div>
        <h6>{song.title}</h6>
        <p>{song.subtitle}</p>
      </div>
      <div></div>
      <div></div>
    </section>
  );
};

export default Player;
