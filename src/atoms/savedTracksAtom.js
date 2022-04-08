import { atom } from "jotai";
import { accessTokenAtom } from "./accessTokenAtom";

export const savedTracksOffset = atom(0);
const fetchSavedTracks = atom();

export const runFetchSavedTracks = atom(
  (get) => get(fetchSavedTracks),
  (get, set) => {
    const fetchData = async () => {
      const token = get(accessTokenAtom);
      const offset = get(savedTracksOffset);
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/tracks/?limit=${10}&offset=${offset}`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + token.token },
          }
        );
        const data = await response.json();
        set(fetchSavedTracks, data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }
);
runFetchSavedTracks.onMount = (runFetch) => {
  runFetch();
};
