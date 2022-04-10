import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaVolumeUp,
  FaPause,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import styles from "./player.module.scss";
import {
  playAndQueueAtom,
  controlCurrentlyPlayingIndex,
  currentlyPlayingIdAtom,
} from "@/atoms/currentlyPlayingAtom";
import { playControlAtom } from "@/atoms/playControlAtom";

const Player = () => {
  const [playing, setPlaying] = useAtom(playControlAtom);
  const [data] = useAtom(playAndQueueAtom);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(
    controlCurrentlyPlayingIndex
  );
  const [currentId, setCurrentId] = useAtom(currentlyPlayingIdAtom);
  const audioRef = useRef();
  const progressBar = useRef();
  const volumeRef = useRef();

  useEffect(
    () =>
      currentlyPlaying && setCurrentId(data.tempPlaylist[currentlyPlaying].id),
    [JSON.stringify(currentlyPlaying)]
  );

  useEffect(() => {
    if (!data.tempPlaylist[currentlyPlaying]?.preview_url) {
      pause();
      audioRef.current.src = undefined;
      return;
    }
    if (!playing) {
      pause();
      return;
    }
    play();
  }, [JSON.stringify(currentlyPlaying)]);

  const handlePlay = () => {
    if (playing || !data.tempPlaylist[currentlyPlaying]?.preview_url) {
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
    if (currentlyPlaying > 0) {
      setCurrentlyPlaying({ type: "prev" });
    }
  };

  const nextTrack = () => {
    if (currentlyPlaying + 1 < data.tempPlaylist.length) {
      setCurrentlyPlaying({ type: "next" });
    }
  };

  const updateProgress = () =>
    (progressBar.current.value = audioRef.current.currentTime);
  const changeProgress = (e) => (audioRef.current.currentTime = e.target.value);
  const changeVolume = (e) => (audioRef.current.volume = e.target.value / 100);

  return (
    <footer className={styles.container}>
      <div className={styles.item__container}>
        <div className={styles.item__left}>
          {currentlyPlaying && (
            <>
              <img
                className={styles.cover}
                src={
                  currentlyPlaying
                    ? data.tempPlaylist[currentlyPlaying]?.album.images[2].url
                    : "https://deepgrooves.eu/wp-content/uploads/2020/08/Green-8499-1024x1024.png"
                }
                alt="cover"
              />
              <div className={styles.title__container}>
                <b className={styles.title}>
                  {data.tempPlaylist[currentlyPlaying]?.name}{" "}
                </b>
                <Link
                  className={styles.artist}
                  to={`/artists/${data.tempPlaylist[currentlyPlaying]?.artists[0].id}`}
                >
                  {data.tempPlaylist[currentlyPlaying]?.artists[0].name}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.item__container}>
        <div className={styles.item__center}>
          <audio
            onEnded={() => setTimeout(() => nextTrack(), 500)}
            onTimeUpdate={updateProgress}
            ref={audioRef}
            src={data.tempPlaylist[currentlyPlaying]?.preview_url}
            preload="auto"
          />
          <div className={styles.controls}>
            <button type="button">
              <FaArrowLeft onClick={prevTrack} />
            </button>
            <button onClick={handlePlay} type="button">
              {!playing ? <FaPlay /> : <FaPause />}
            </button>
            <button type="button">
              <FaArrowRight onClick={nextTrack} />
            </button>
          </div>
          <input
            max="30"
            min="0"
            className={styles.progressBar}
            onChange={changeProgress}
            ref={progressBar}
            type="range"
          />
        </div>
      </div>
      <div className={styles.item__container}>
        <div>
          <FaVolumeUp />
          <input
            onChange={changeVolume}
            ref={volumeRef}
            defaultValue="50"
            type="range"
          />
        </div>
      </div>
    </footer>
  );
};

export default Player;
