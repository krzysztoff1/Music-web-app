import styles from "./savedTracks.module.scss";
import { useAtom } from "jotai";
import { runFetchSavedTracks } from "@/atoms/savedTracksAtom";
import {
  currentlyPlayingIndexAtom,
  updatePlayAndQueueAtom,
} from "@/atoms/currentlyPlayingAtom";
import { currentPlaylistAtom } from "@/atoms/currentPlaylistAtom";
import { Row, Spinner } from "@/components/basic";
import { Suspense, useRef, useEffect } from "react";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { useInfiniteQuery } from "react-query";

const SavedTracks = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [savedTracks, runSavedTracks] = useAtom(runFetchSavedTracks);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(
    currentlyPlayingIndexAtom
  );
  const [get, updateQueue] = useAtom(updatePlayAndQueueAtom);
  const [currentPlaylist, setCurrentPlaylist] = useAtom(currentPlaylistAtom);
  const containerRef = useRef();
  const sizeOfPage = 50;
  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    "saved",
    async ({ pageParam = 0 }) => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks/?limit=${sizeOfPage}&offset=${pageParam}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken.token}` },
        }
      );
      if (response.ok) {
        const result = await response.json();
        return result.items;
      }
    },
    {
      getNextPageParam: (lastPage, pages) => pages.length * sizeOfPage,
    }
  );

  const playTrack = async ({ index }) => {
    const tempPlaylist = [];
    data.pages[Math.trunc(index / sizeOfPage)].forEach((item) =>
      tempPlaylist.push(item?.track)
    );
    const i = index - Math.trunc(index / sizeOfPage) * sizeOfPage;
    setCurrentPlaylist({ title: "saved", url: "/saved_tracks" });
    setCurrentlyPlaying(i);
    updateQueue({ tempPlaylist });
  };

  const onScroll = () => {
    if (
      !isFetchingNextPage &&
      containerRef.current.scrollHeight - containerRef.current.scrollTop <=
        containerRef.current.clientHeight * 2
    )
      fetchNextPage();
  };

  if (status !== "success") return <Spinner />;

  return (
    <main onScroll={onScroll} ref={containerRef} className={styles.main}>
      <header className={styles.header}>
        <h4 className={styles.header__title}>Saved tracks</h4>
      </header>
      <section className={styles.section__list}>
        {data?.pages?.map((page, i) =>
          page.map((item, x) => (
            <Row
              key={item.track.id}
              item={item.track}
              i={i * sizeOfPage + x}
              playTrack={playTrack}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default SavedTracks;
