import styles from "./row.module.scss";
import { atom, useAtom } from "jotai";
import { controlCurrentlyPlaying } from "@/atoms/currentlyPlayingAtom";
import { playControlAtom } from "@/atoms/playControlAtom";
import { Link } from "react-router-dom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { FaEllipsisH } from "react-icons/fa";
import { playAndQueueAtom } from "@/atoms/playAndQueueAtom";
import { useEffect } from "react";

const queueAtom = atom();

const Row = ({ item, i, playTrack, playlistTitle, url }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(
    controlCurrentlyPlaying
  );
  const [playControl] = useAtom(playControlAtom);
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);
  const [data, setData] = useAtom(playAndQueueAtom);
  const [queue, setQueue] = useAtom(queueAtom);

  const addToQueue = (e) => {
    e.stopPropagation();
    console.log("add to queue");
    // console.log(item);
    // const newArr = [data.tempPlaylist[0], item, ...data.tempPlaylist.slice(1)];
    // console.log(newArr);
    // setData({
    //   currentTrack: data.currentTrack,
    //   tempPlaylist: newArr,
    // });
  };

  return (
    <article
      onClick={() => {
        playTrack(i);
        setCurrentPlaylist({
          title: playlistTitle,
          url: url,
        });
      }}
      className={styles.row}
    >
      {currentPlaylist?.title === playlistTitle &&
      currentlyPlaying === i &&
      playControl ? (
        <div className={styles.animation__container}>
          <div className={styles.animation__column} />
          <div className={styles.animation__column} />
          <div className={styles.animation__column} />
        </div>
      ) : (
        <p className={styles.track__index}>{i + 1}</p>
      )}
      <b
        style={{
          color: `${
            currentPlaylist?.title === playlistTitle && currentlyPlaying === i
              ? "#0be881"
              : "white"
          }`,
        }}
      >
        {item.track.name}
      </b>
      <Link to={`/artists/${item.track.artists[0].id}`}>
        <p>{item.track.artists[0].name}</p>
      </Link>
      <button onClick={addToQueue} className={styles.more}>
        <FaEllipsisH className={styles.icon} />
      </button>
    </article>
  );
};

export default Row;
