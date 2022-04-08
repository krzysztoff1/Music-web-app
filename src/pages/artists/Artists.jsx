import { atom, useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { atomWithStorage } from "jotai/utils";
import { updatePlayAndQueueAtom } from "@/atoms/playAndQueueAtom";
import Row from "@/components/basic/row/Row";
import { currentlyPlayingAtom } from "@/atoms/currentlyPlayingAtom";
import styles from "./artists.module.scss";
import { motion } from "framer-motion";
import { Spinner } from "@/components/basic";
import AlbumCard from "@/components/basic/albumCard/AlbumCard";

const artistsArtistDataAtom = atomWithStorage();
const artistsTracks = atom();
const artistsAlbums = atom();

const Artists = () => {
  const { id } = useParams();
  const [token] = useAtom(accessTokenAtom);
  const [artistData, setArtistData] = useAtom(artistsArtistDataAtom);
  const [tracks, setTracks] = useAtom(artistsTracks);
  const [albums, setAlbums] = useAtom(artistsAlbums);
  const [currentlyPlaying, setCurrentlyPlaying] = useAtom(currentlyPlayingAtom);
  const [get, update] = useAtom(updatePlayAndQueueAtom);
  const mainRef = useRef();

  useEffect(() => {
    console.log(mainRef.scrollTop);
  }, [mainRef.scrollTop]);

  useEffect(() => {
    getArtistArtistData();
    getTracks();
    getAlbums();
    return () => {
      setTracks();
      setArtistData();
      setAlbums();
    };
  }, []);

  useEffect(() => console.log(albums), [albums]);

  const getArtistArtistData = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token.token}` },
      });
      setArtistData(await response.json());
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

  const getAlbums = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/albums?include_groups=single%2Cappears_on&market=PL&limit=10`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      setAlbums(await response.json());
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

  if (!artistData || !tracks || !albums) return <Spinner />;

  return (
    <main ref={mainRef} className={styles.main}>
      <header className={styles.header}>
        <motion.img
          className={styles.cover}
          src={artistData.images[1].url}
          alt="artist cover"
        />
        <div className={styles.header__text}>
          <p>Artist</p>
          <h1>{artistData.name}</h1>
          <p>
            {artistData.genres.map((genre) => (
              <span key={genre}>{genre} </span>
            ))}
          </p>
        </div>
      </header>
      <section className={styles.list__section}>
        <h4 className={styles.list__section__subtitle}>Top Tracks</h4>
        {tracks.tracks.map((item, i) => (
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
      <section className={styles.list__section}>
        <h4 className={styles.list__section__subtitle}>Albums</h4>
        <div className={styles.cards__container}>
          {albums.items.map((item) => (
            <AlbumCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Artists;
