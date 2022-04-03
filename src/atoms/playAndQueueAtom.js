import { atom } from "jotai";

export const playAndQueueAtom = atom();

export const updatePlayAndQueueAtom = atom(
  (get) => get(playAndQueueAtom),
  async (_get, set, currentTrack, tempPlaylist) => {
    console.log(tempPlaylist);
    set(playAndQueueAtom, {
      currentTrack: currentTrack,
      tempPlaylist: tempPlaylist,
    });
  }
);
