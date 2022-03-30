import { atom } from "jotai";

export const playingAtom = atom("none");

export const updatePlaying = atom(
  (get) => get(playingAtom),
  async (_get, set, song) => {
    set(song);
  }
);
