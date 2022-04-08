import styles from "./savedTracks.module.scss";
import { useAtom } from "jotai";
import {
  runFetchSavedTracks,
  savedTracksOffset,
} from "@/atoms/savedTracksAtom";
import { updatePlayAndQueueAtom } from "@/atoms/playAndQueueAtom";
import { currentlyPlayingAtom } from "@/atoms/currentlyPlayingAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { Row, Spinner } from "@/components/basic";
import { useUpdateAtom } from "jotai/utils";
import { useEffect, useState } from "react";
import { playingAtom } from "@/atoms/playerAtom";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";

const SavedTracks = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [savedTracks, runSavedTracks] = useAtom(runFetchSavedTracks);
  const [song, setSong] = useAtom(playingAtom);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(currentlyPlayingAtom);
  const [get, update] = useAtom(updatePlayAndQueueAtom);
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);
  const setOffset = useUpdateAtom(savedTracksOffset);
  const [tracks, setTracks] = useState();
  const [next, setNext] = useState();

  useEffect(() => {
    if (savedTracks) {
      setTracks(savedTracks.items);
      console.log(tracks);
    }
  }, [savedTracks]);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const fetchMoreTracks = () => {
    runSavedTracks();
    const fetchData = async () => {
      try {
        const response = await fetch(`${savedTracks.next}`, {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.token },
        });
        const data = await response.json();
        setTracks((state) => [...state, ...data.items]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  const playTrack = async (i) => {
    const tempPlaylist = [];
    savedTracks.items.forEach((item) => tempPlaylist.push(item.track));
    const track = i;

    setCurrentPlaylist({ title: "saved", url: "/saved_tracks" });
    setCurrentlyPlaying(i);
    update({ track, tempPlaylist });
  };

  // const fetchMoreTracks = () => {
  //   setOffset((x) => x + 10);
  //   runSavedTracks();
  // };

  if (!savedTracks) return <Spinner />;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h4 className={styles.header__title}>Saved tracks</h4>
      </header>
      <section className={styles.section__list}>
        {tracks?.map((item, i) => (
          <Row
            key={item.track.id}
            item={item.track}
            i={i}
            playTrack={playTrack}
          />
        ))}
        <button type="button" onClick={fetchMoreTracks}>
          More...
        </button>
      </section>
    </main>
  );
};

export default SavedTracks;
