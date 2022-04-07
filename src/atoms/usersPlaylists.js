import { atom } from "jotai";
import { accessTokenAtom } from "./accessTokenAtom";

const usersPlaylistsAtom = atom({ loading: true, error: null, data: null });

export const runUsersPlaylists = atom(
  (get) => get(usersPlaylistsAtom),
  (get, set) => {
    const fetchData = async () => {
      const token = get(accessTokenAtom);
      set(usersPlaylistsAtom, (prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists?limit=40",
          {
            method: "GET",
            headers: { Authorization: "Bearer " + token.token },
          }
        );
        const data = await response.json();
        set(usersPlaylistsAtom, { loading: false, error: null, data });
      } catch (error) {
        set(usersPlaylistsAtom, { loading: false, error, data: null });
      }
    };
    fetchData();
  }
);
runUsersPlaylists.onMount = (runFetch) => {
  runFetch();
};
