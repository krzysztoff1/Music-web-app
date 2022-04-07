import styles from "./savedTracks.module.scss";
import { useAtom } from "jotai";
import { runFetchSavedTracks } from "@/atoms/savedTracksAtom";
import { playingAtom } from "@/atoms/playerAtom";
import { updatePlayAndQueueAtom } from "@/atoms/playAndQueueAtom";
import { currentlyPlayingAtom } from "@/atoms/currentlyPlayingAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";

import { Row } from "@/components/basic";

const SavedTracks = () => {
  const [savedTracks] = useAtom(runFetchSavedTracks);
  const [song, setSong] = useAtom(playingAtom);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(currentlyPlayingAtom);
  const [get, update] = useAtom(updatePlayAndQueueAtom);
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);

  const playTrack = async (i) => {
    const tempPlaylist = [];
    savedTracks.data.items.forEach((item) => tempPlaylist.push(item.track));
    const track = i;
    setCurrentPlaylist({ title: "saved", url: "/saved_tracks" });
    setCurrentlyPlaying(i);
    update({ track, tempPlaylist });
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h4 className={styles.header__title}>Saved tracks</h4>
      </header>
      <section className={styles.section__list}>
        {savedTracks.data?.items.map((item, i) => (
          <Row key={item.track.id} item={item} i={i} playTrack={playTrack} />
        ))}
      </section>
    </main>
  );
};

export default SavedTracks;
