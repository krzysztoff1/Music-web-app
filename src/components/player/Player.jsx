import { useEffect } from "react";
import { playingAtom, updatePlaying } from "@/atoms/playerAtom";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { atom, useAtom } from "jotai";
import styles from "./player.module.scss";

const Player = () => {
  const [track, setTrack] = useAtom(playingAtom);

  useEffect(() => {
    console.log(track);
  }, [track]);

  if (track === "none") return <></>;
  return (
    <section className={styles.container}>
      <div>
        <b>{track.name}</b>
        <p>{track.artists[0].name}</p>
      </div>
      <div></div>
      <div></div>
    </section>
  );
};

export default Player;
