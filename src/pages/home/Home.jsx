import { useAtom, atom } from "jotai";
import { runFetchGenresAtom } from "@/atoms/genresAtom";
import { updatePlayAndQueueAtom } from "@/atoms/currentlyPlayingAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { useEffect } from "react";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import styles from "./home.module.scss";
import { AlbumCard, Card } from "@/components/basic";

const newReleasesAtom = atom();

const Home = () => {
  const accessToken = useAtom(accessTokenAtom);
  const [categories] = useAtom(runFetchGenresAtom);
  const [get, update] = useAtom(updatePlayAndQueueAtom);
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);

  const [newReleases, setNewReleases] = useAtom(newReleasesAtom);

  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/browse/new-releases?country=PL&limit=10",
      // "https://api.spotify.com/v1/browse/featured-playlists?country=PL&locale=pl_PL&limit=10&offset=0",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken[0].token },
      }
    )
      .then((response) => {
        if (response.ok) return setNewReleases(response.json());
        throw new Error("Something went wrong");
      })
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://api.spotify.com/v1/browse/featured-playlists?country=PL&locale=pl_PL&limit=10&offset=0",
  //     {
  //       method: "GET",
  //       headers: { Authorization: "Bearer " + accessToken[0].token },
  //     }
  //   )
  //     .then((response) => {
  //       if (response.ok) return console.log(response.json());
  //       throw new Error("Something went wrong");
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  const playTrack = async (i) => {
    // const tempPlaylist = [];
    // savedTracks.data.items.forEach((item) => tempPlaylist.push(item.track));
    // const track = i;
    // setCurrentPlaylist({ title: "saved", url: "/saved_tracks" });
    // setCurrentlyPlaying(i);
    // update({ track, tempPlaylist });
  };

  if (!newReleases || !categories) return <>Loading...</>;

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
        <h4 className={styles.section__title}>Recommendations</h4>
        <div className={styles.section__list}>
          {newReleases?.albums.items.map((item, i) => (
            <AlbumCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
