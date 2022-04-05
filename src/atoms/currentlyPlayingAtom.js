import { atom } from "jotai";

export const currentlyPlayingAtom = atom();

export const controlCurrentlyPlaying = atom(
  (get) => get(currentlyPlayingAtom),
  (get, set, action) => {
    if (action.type === "next") {
      set(currentlyPlayingAtom, (c) => c + 1);
    } else if (action.type === "prev") {
      set(currentlyPlayingAtom, (c) => c - 1);
    }
  }
);
