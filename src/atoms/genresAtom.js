import { atom } from "jotai";
import { accessTokenAtom } from "./accessTokenAtom";

const fetchGenresAtom = atom({ loading: true, error: null, data: null });

export const runFetchGenresAtom = atom(
  (get) => get(fetchGenresAtom),
  (get, set) => {
    const fetchData = async () => {
      set(fetchGenresAtom, (prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/categories/",
          {
            method: "GET",
            headers: { Authorization: "Bearer " + get(accessTokenAtom) },
          }
        );
        const data = await response.json();
        set(fetchGenresAtom, { loading: false, error: null, data });
      } catch (error) {
        set(fetchGenresAtom, { loading: false, error, data: null });
      }
    };
    fetchData();
  }
);
runFetchGenresAtom.onMount = (runFetch) => {
  runFetch();
};
