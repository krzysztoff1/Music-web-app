import { Suspense, useEffect } from "react";
import { atom, useAtom } from "jotai";
import Card from "@/components/cards/card/Card";
import styles from "./home.module.scss";
import { runFetchGenresAtom } from "@/atoms/genresAtom";
import { runFetchSavedTracks } from "@/atoms/savedTracksAtom";
import TrackCard from "@/components/cards/trackCard/TrackCard";

const Home = () => {
  const [categories] = useAtom(runFetchGenresAtom);
  const [savedTracks] = useAtom(runFetchSavedTracks);

  return (
    <Suspense fallback={<>Loading...</>}>
      <main className={styles.main}>
        <section className={styles.section__container}>
          <h4>Categories</h4>
          <div className={styles.section__list}>
            {categories.data?.categories?.items.map((category) => (
              <Card key={category.id} image={category.icons[0].url} />
            ))}
          </div>
        </section>
        <section className={styles.section__container}>
          <h4>Saved tracks</h4>
          <div className={styles.section__list}>
            {savedTracks.data?.items.map((item) => (
              <TrackCard
                key={item.track.id}
                image={item.track.album.images[0].url}
                data={item}
              />
            ))}
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default Home;
