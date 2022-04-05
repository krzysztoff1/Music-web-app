import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { FaPlay, FaPause, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./player.module.scss";
import { playAndQueueAtom } from "@/atoms/playAndQueueAtom";
import { controlCurrentlyPlaying } from "@/atoms/currentlyPlayingAtom";

const Player = () => {
  const [data] = useAtom(playAndQueueAtom);
  const [playing, setPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(
    controlCurrentlyPlaying
  );
  const audioRef = useRef();
  const progressBar = useRef();

  useEffect(() => {
    if (!data.tempPlaylist[currentlyPlaying]?.track.preview_url) {
      pause();
      audioRef.current.src = undefined;
      return;
    }
    if (!playing) {
      pause();
      return;
    }
    play();
  }, [currentlyPlaying]);

  const updateProgress = () => {
    progressBar.current.value = audioRef.current.currentTime;
  };

  const handlePlay = () => {
    if (playing || !data.tempPlaylist[currentlyPlaying]?.track.preview_url) {
      pause();
      return;
    }
    play();
  };

  const play = () => {
    setPlaying(true);
    audioRef.current.play();
  };

  const pause = () => {
    setPlaying(false);
    audioRef.current.pause();
  };

  const prevTrack = () => {
    if (currentlyPlaying + 1 < data.tempPlaylist.length) {
      setCurrentlyPlaying({ type: "next" });
    }
  };

  const nextTrack = () => {
    if (currentlyPlaying > 0) {
      setCurrentlyPlaying({ type: "prev" });
    }
  };

  return (
    <footer className={styles.container}>
      <div className={styles.item__container}>
        <div className={styles.item__left}>
          {data.tempPlaylist && (
            <>
              <img
                className={styles.cover}
                src={
                  currentlyPlaying
                    ? data.tempPlaylist[currentlyPlaying]?.track.album.images[2]
                        .url
                    : "https://deepgrooves.eu/wp-content/uploads/2020/08/Green-8499-1024x1024.png"
                }
                alt="cover"
              />
              <div>
                <b className="truncate">
                  {data.tempPlaylist[currentlyPlaying]?.track.name}
                </b>
                <p className="truncate">
                  {data.tempPlaylist[currentlyPlaying]?.track.artists[0].name}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.item__container}>
        <div className={styles.item__center}>
          <audio
            ref={audioRef}
            src={data.tempPlaylist[currentlyPlaying]?.track.preview_url}
            preload="auto"
            volume="0.1"
            onTimeUpdate={updateProgress}
          />
          <div className={styles.controls}>
            <button type="button">
              <FaArrowLeft onClick={nextTrack} />
            </button>
            <button onClick={handlePlay} type="button">
              {!playing ? <FaPlay /> : <FaPause />}
            </button>
            <button type="button">
              <FaArrowRight onClick={prevTrack} />
            </button>
          </div>
          <input ref={progressBar} type="range" />
        </div>
      </div>
      <div className={styles.item__container}></div>
    </footer>
  );
};

export default Player;
