import { useState, useEffect } from "react";
import styles from "./search.module.scss";
import { atom, useAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { Row } from "@/components/basic";
import { currentlyPlayingIndexAtom } from "@/atoms/currentlyPlayingAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { updatePlayAndQueueAtom } from "@/atoms/currentlyPlayingAtom";

const resultsAtom = atom();
const queryAtom = atom();

const Search = () => {
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(
    currentlyPlayingIndexAtom
  );
  const [get, update] = useAtom(updatePlayAndQueueAtom);
  const accessToken = useAtom(accessTokenAtom);
  const [results, setResults] = useAtom(resultsAtom);
  const [query, setQuery] = useAtom(queryAtom);

  useEffect(() => {
    if (query) handleSubmit();
  }, [JSON.stringify(query)]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&market=PL`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken[0].token}` },
        }
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const playTrack = async (i) => {
    const tempPlaylist = results?.tracks.items;
    const track = i;
    setCurrentPlaylist({ title: "search", url: "/search" });
    setCurrentlyPlaying(i);
    update({ track, tempPlaylist });
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h4 className={styles.list__section__subtitle}>Search</h4>
        <div className={styles.input__container}>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className={styles.input}
          />
          <button onClick={handleSubmit} type="button">
            Search
          </button>
        </div>
      </header>
      <section className={styles.list__section}>
        {results?.tracks.items.map((item, i) => (
          <Row key={item.id} item={item} i={i} playTrack={playTrack} />
        ))}
      </section>
    </main>
  );
};

export default Search;
