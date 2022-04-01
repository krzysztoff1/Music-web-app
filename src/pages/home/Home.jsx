import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import Card from "@/components/card/Card";
import styles from "./home.module.scss";
import { atomWithStorage } from "jotai/utils";

const Home = () => {
  return (
    <main>
      <section className={styles.section__container}>
        <h4>Top Tracks</h4>
        <div className={styles.section__list}></div>
      </section>
    </main>
  );
};

export default Home;
