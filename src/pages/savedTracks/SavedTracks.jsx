import { useAtom } from "jotai";
import { runFetchSavedTracks } from "@/atoms/savedTracksAtom";
import styles from "./savedTracks.module.scss";
import Row from "@/components/row/Row";
import { playingAtom } from "@/atoms/playerAtom";
import { updatePlayAndQueueAtom } from "@/atoms/playAndQueueAtom";
import { useEffect } from "react";

const SavedTracks = () => {
  const [savedTracks] = useAtom(runFetchSavedTracks);
  const [song, setSong] = useAtom(playingAtom);
  const [get, update] = useAtom(updatePlayAndQueueAtom);

  useEffect(() => {}, []);

  const playTrack = async (currentTrack) => {
    const tempPlaylist = [];
    savedTracks.data.items.map(
      (item) => item.track.preview_url && tempPlaylist.push(currentTrack)
    );
    console.log(tempPlaylist);
    setSong(currentTrack.track);
    update(currentTrack.track, tempPlaylist);
  };

  return (
    <main className={styles.main}>
      <section className={styles.section__list}>
        {savedTracks.data?.items.map((item, i) => (
          <Row key={item.track.id} item={item} i={i} playTrack={playTrack} />
        ))}
      </section>
    </main>
  );
};

export default SavedTracks;
