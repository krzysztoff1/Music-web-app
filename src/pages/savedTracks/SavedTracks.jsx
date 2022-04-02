import { useEffect } from "react";
import { useAtom } from "jotai";
import { runFetchSavedTracks } from "@/atoms/savedTracksAtom";
import styles from "./savedTracks.module.scss";
import Row from "@/components/row/Row";

const SavedTracks = () => {
  const [savedTracks] = useAtom(runFetchSavedTracks);

  useEffect(() => {
    let filteredArray = [];
    savedTracks.data.items.map(
      (track) => track.track.preview_url && filteredArray.push(track)
    );
  }, [savedTracks]);

  return (
    <main className={styles.main}>
      <section className={styles.section__list}>
        {savedTracks.data?.items.map((item, i) => (
          <Row key={item.track.id} item={item} i={i} />
        ))}
      </section>
    </main>
  );
};

export default SavedTracks;
