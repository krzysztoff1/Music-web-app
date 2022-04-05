import { useAtom } from "jotai";
import { runFetchSavedTracks } from "@/atoms/savedTracksAtom";
import styles from "./savedTracks.module.scss";
import Row from "@/components/row/Row";
import { playingAtom } from "@/atoms/playerAtom";
import { updatePlayAndQueueAtom } from "@/atoms/playAndQueueAtom";
import { Suspense, useEffect } from "react";
import { currentlyPlayingAtom } from "@/atoms/currentlyPlayingAtom";

const SavedTracks = () => {
  const [savedTracks] = useAtom(runFetchSavedTracks);
  const [song, setSong] = useAtom(playingAtom);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(currentlyPlayingAtom);
  const [get, update] = useAtom(updatePlayAndQueueAtom);

  useEffect(() => {}, []);

  const playTrack = async (i) => {
    const tempPlaylist = savedTracks.data.items;
    const track = i;

    setCurrentlyPlaying(i);
    update({ track, tempPlaylist });
  };

  return (
    <main className={styles.main}>
      <h4>Saved tracks</h4>

      <section className={styles.section__list}>
        {savedTracks.data?.items.map((item, i) => (
          <Row key={item.track.id} item={item} i={i} playTrack={playTrack} />
        ))}
      </section>
    </main>
  );
};

export default SavedTracks;
