import styles from "./album.module.scss";
import { useParams } from "react-router-dom";
import { useAtom, atom } from "jotai";
import { atomWithQuery } from "jotai/query";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { Suspense, useEffect, useState } from "react";
import { Row, Spinner } from "@/components/basic";
import { Header } from "@/components";

const Album = () => {
  const { id } = useParams();
  const [accessToken] = useAtom(accessTokenAtom);
  const [tracks, setTracks] = useState();
  const [album, setAlbum] = useState();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    fetch(`https://api.spotify.com/v1/albums/${id}/tracks?market=PL`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken.token}` },
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((tracks) => {
        setTracks(tracks);
        return fetch(`https://api.spotify.com/v1/albums/${id}?market=PL`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken.token}` },
        });
      })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((albumData) => setAlbum(albumData))
      .catch((error) => console.warn(error));
  };

  const playTrack = async ({ index }) => {
    // const tempPlaylist = tracks.tracks;
    // const i = index;
    // setCurrentPlaylist({ title: `artist/${id}`, url: `artist/${id}` });
    // setCurrentlyPlaying(i);
    // updateQueue({ tempPlaylist });
  };

  if (!album || !tracks) return <Spinner />;

  return (
    <main className={styles.main}>
      <Header
        cover={album?.images[1].url}
        subTitle={album?.artists[0].name}
        name={album?.name}
        type={"Album"}
      />
      <section className={styles.list__section}>
        {tracks?.items?.map((item, i) => (
          <Row
            key={item.id}
            playlistTitle={`artists/${id}`}
            url={`/artists/${id}`}
            item={item}
            i={i}
            playTrack={playTrack}
          />
        ))}
        <div className={styles.section__footer}></div>
      </section>
    </main>
  );
};

export default Album;
