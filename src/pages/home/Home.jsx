import { useAtom } from "jotai";
import { runFetchGenresAtom } from "@/atoms/genresAtom";
import { runFetchSavedTracks } from "@/atoms/savedTracksAtom";
import { playingAtom } from "@/atoms/playerAtom";
import { updatePlayAndQueueAtom } from "@/atoms/playAndQueueAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { currentlyPlayingAtom } from "@/atoms/currentlyPlayingAtom";

import styles from "./home.module.scss";

import Card from "@/components/basic/card/Card";
import { Row, TrackCard } from "@/components/basic";

const Home = () => {
  const [categories] = useAtom(runFetchGenresAtom);
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

  if (!savedTracks) return <>Loading...</>;

  return (
    <main className={styles.main}>
      <section className={styles.section__container}>
        <h4 className={styles.section__title}>Categories</h4>
        <div className={styles.section__list}>
          {categories.data?.categories?.items.map((category) => (
            <Card key={category.id} image={category.icons[0].url} />
          ))}
        </div>
      </section>
      <section className={styles.section__container}>
        <h4 className={styles.section__title}>Saved tracks</h4>
        <div className={styles.section__list}>
          {savedTracks.data?.items.map((item, i) => (
            <TrackCard
              i={i}
              key={item.track.id}
              item={item.track}
              playTrack={playTrack}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
