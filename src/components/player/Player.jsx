import { useEffect, useRef, useState } from "react";
import { playingAtom } from "@/atoms/playerAtom";
import { useAtom } from "jotai";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./player.module.scss";

const Player = () => {
  const [track] = useAtom(playingAtom);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const totalTime = 30;

  useEffect(() => {
    if (!track) return;
    setPlaying(false);
    audioRef.current.currentTime = 0;
    progressBarRef.current.value = 0;
    setPlaying(true);
  }, [track]);

  useEffect(() => {
    if (!track) return;
    if (playing) {
      audioRef.current.play();
      return;
    }
    audioRef.current.pause();
  }, [playing]);

  const changeRange = () =>
    (audioRef.current.currentTime = progressBarRef.current.value);

  return (
    <footer className={styles.container}>
      <div className={styles.item__container}>
        <div className={styles.item__left}>
          {track && (
            <>
              <img
                className={styles.cover}
                src={track.album.images[1].url}
                alt="cover"
              />
              <div>
                <b className="truncate">{track.name}</b>
                <p className="truncate">{track.artists[0].name}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.item__container}>
        <div className={styles.item__center}>
          <audio
            ref={audioRef}
            src={track?.preview_url}
            preload="auto"
            volume="1"
          />
          <div className={styles.controls}>
            <button onClick={() => setPlaying((state) => !state)} type="button">
              {!playing ? <FaPlay /> : <FaPause />}
            </button>
          </div>
          <input
            type="range"
            defaultValue="0"
            ref={progressBarRef}
            onChange={changeRange}
            max={totalTime}
            step="0.1"
          />
        </div>
      </div>
      <div className={styles.item__container}></div>
    </footer>
  );
};

export default Player;
