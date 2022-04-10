import styles from "./row.module.scss";
import { atom, useAtom } from "jotai";
import { currentlyPlayingIdAtom } from "@/atoms/currentlyPlayingAtom";
import { playControlAtom } from "@/atoms/playControlAtom";
import { Link } from "react-router-dom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { FaEllipsisH } from "react-icons/fa";

const queueAtom = atom();

const Row = ({ item, i, playTrack, playlistTitle, url }) => {
  const [currentId] = useAtom(currentlyPlayingIdAtom);
  const [playControl] = useAtom(playControlAtom);
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);
  const index = i;

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
        playTrack({ item, index });
        setCurrentPlaylist({
          title: playlistTitle,
          url: url,
        });
      }}
      style={{ opacity: item.preview_url ? "1" : "0.7" }}
      className={styles.row}
    >
      {currentPlaylist?.title === playlistTitle &&
      currentId === item.id &&
      playControl ? (
        <div className={styles.animation__container}>
          <div className={styles.animation__column} />
          <div className={styles.animation__column} />
          <div className={styles.animation__column} />
        </div>
      ) : (
        <div className={styles.track__index__container}>
          <p className={styles.track__index}>{i + 1}</p>
        </div>
      )}
      <div className={styles.track__name__container}>
        <b
          className={styles.track__name}
          style={{
            color: `${
              currentPlaylist?.title === playlistTitle && currentId === item.id
                ? "#0be881"
                : "white"
            }`,
          }}
        >
          {item.name}
        </b>
      </div>
      <div className={styles.track__artist__container}>
        <Link
          className={styles.track__artist}
          onClick={(e) => e.stopPropagation()}
          to={`/artists/${item.artists[0].id}`}
        >
          <p>{item.artists[0].name}</p>
        </Link>
      </div>
      <button onClick={addToQueue} className={styles.more}>
        <FaEllipsisH className={styles.icon} />
      </button>
    </article>
  );
};

export default Row;
