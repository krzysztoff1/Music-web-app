import { atom } from "jotai";
import { accessTokenAtom } from "./accessTokenAtom";

const fetchSavedTracks = atom({ loading: true, error: null, data: null });

export const runFetchSavedTracks = atom(
  (get) => get(fetchSavedTracks),
  (get, set) => {
    const fetchData = async () => {
      set(fetchSavedTracks, (prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch("https://api.spotify.com/v1/me/tracks/", {
          method: "GET",
          headers: { Authorization: "Bearer " + get(accessTokenAtom) },
        });
        const data = await response.json();
        set(fetchSavedTracks, { loading: false, error: null, data });
      } catch (error) {
        set(fetchSavedTracks, { loading: false, error, data: null });
      }
    };
    fetchData();
  }
);
runFetchSavedTracks.onMount = (runFetch) => {
  runFetch();
};
