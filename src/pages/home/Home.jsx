import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import Card from "@/components/card/Card";
import styles from "./home.module.scss";
import { atomWithStorage } from "jotai/utils";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    "X-RapidAPI-Key": "ce6affad17mshdb2a7ee7a40f6efp18a980jsn42953df98c35",
  },
};

const dataAtom = atomWithStorage();

const fetchData = atom(
  (get) => get(dataAtom),
  async (_get, set) => {
    const response = await fetch(
      "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0",
      options
    );
    set(dataAtom, await response.json());
  }
);

const Home = () => {
  const [data, compute] = useAtom(fetchData);

  useEffect(() => {
    compute();
  }, []);

  if (!data) return <>Loading...</>;

  return (
    <main>
      <section className={styles.section__container}>
        <h4>Top Tracks</h4>
        <div className={styles.section__list}>
          {data.tracks.map((track) => (
            <Card key={track.key} {...track} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
