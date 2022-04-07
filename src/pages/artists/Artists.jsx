import { atom, useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { atomWithStorage } from "jotai/utils";
import { updatePlayAndQueueAtom } from "@/atoms/playAndQueueAtom";
import Row from "@/components/basic/row/Row";
import { currentlyPlayingAtom } from "@/atoms/currentlyPlayingAtom";
import styles from "./artists.module.scss";

const artistsDataAtom = atom();
const artistsTracks = atom();

const Artists = () => {
  const { id } = useParams();
  const [token] = useAtom(accessTokenAtom);
  const [data, setData] = useAtom(artistsDataAtom);
  const [tracks, setTracks] = useAtom(artistsTracks);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(currentlyPlayingAtom);
  const [get, update] = useAtom(updatePlayAndQueueAtom);

  useEffect(() => {
    getArtistData();
    getTracks();
  }, []);

  const getArtistData = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token.token}` },
      });
      setData(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  const getTracks = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      setTracks(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  const playTrack = async (i) => {
    const tempPlaylist = tracks.tracks;
    const track = i;
    setCurrentlyPlaying(i);
    update({ track, tempPlaylist });
  };

  if (!data || !tracks) return <>loading....</>;

  return (
    <main className={styles.main}>
      <Suspense fallback={<>Loading...</>}>
        <header className={styles.header}>
          {data.images && (
            <img
              className={styles.cover}
              src={data.images[1].url}
              alt="artists cover"
            />
          )}
          <h2>{data.name}</h2>
        </header>
        <section>
          {tracks.tracks?.map((item, i) => (
            <Row
              key={item.id}
              playlistTitle={`artists/${id}`}
              url={`/artists/${id}`}
              item={item}
              i={i}
              playTrack={playTrack}
            />
          ))}
        </section>
      </Suspense>
    </main>
  );
};

export default Artists;
