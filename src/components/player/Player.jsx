import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { FaPlay, FaPause, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./player.module.scss";
import { playAndQueueAtom } from "@/atoms/playAndQueueAtom";
import Draggable, { DraggableCore } from "react-draggable";

const Player = () => {
  const [data, setData] = useAtom(playAndQueueAtom);
  const [playing, setPlaying] = useState(false);
  const [deltaX, setDeltaX] = useState();
  const audioRef = useRef();
  const progressBarRef = useRef();
  const nodeRef = useRef();
  const totalTime = 30;

  useEffect(() => {
    console.log(data);
    console.log(data.currentTrack);
    console.log("====================================");
    if (!data.tempPlaylist.length) return;
    console.log(data.tempPlaylist[data.currentTrack].track.name);
    console.log("====================================");
  }, [data]);

  const nextTrack = () => {
    setData({ currentTrack: 2 });
  };

  const changeRange = () =>
    (audioRef.current.currentTime = progressBarRef.current.value);

  return (
    <footer className={styles.container}>
      <div className={styles.item__container}>
        <div className={styles.item__left}>
          {data.tempPlaylist && (
            <>
              {/* <img
                className={styles.cover}
                src={data.currentTrack?.album.images[1].url}
                alt="cover"
              /> */}
              <div>
                <b className="truncate">
                  {data.tempPlaylist[data.currentTrack]?.track.name}
                </b>
                <p className="truncate">
                  {data.tempPlaylist[data.currentTrack]?.track.artists[0].name}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.item__container}>
        <div className={styles.item__center}>
          {/* <audio
            ref={audioRef}
            src={data.currentTrack?.preview_url}
            preload="auto"
            volume={0.1}
          /> */}
          <div className={styles.controls}>
            <button type="button">
              <FaArrowLeft onClick={nextTrack} />
            </button>
            <button onClick={() => setPlaying((state) => !state)} type="button">
              {!playing ? <FaPlay /> : <FaPause />}
            </button>
            <button type="button">
              <FaArrowRight onClick={nextTrack} />
            </button>
          </div>
          {/* <Draggable
            nodeRef={nodeRef}
            axis="x"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[150, 150]}
            scale={1}
            onDrag={() => handleDrag}
          >
            <div>
              <div ref={nodeRef} className={("handle", styles.handle)}>
                Drag from
              </div>
            </div>
          </Draggable> */}
        </div>
      </div>
      <div className={styles.item__container}></div>
    </footer>
  );
};

export default Player;
