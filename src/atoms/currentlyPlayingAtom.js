import { atom } from "jotai";

export const currentlyPlayingIdAtom = atom();

export const currentlyPlayingIndexAtom = atom();
export const controlCurrentlyPlayingIndex = atom(
  (get) => get(currentlyPlayingIndexAtom),
  (_get, set, action) => {
    if (action.type === "next") {
      set(currentlyPlayingIndexAtom, (c) => c + 1);
    } else if (action.type === "prev") {
      set(currentlyPlayingIndexAtom, (c) => c - 1);
    }
  }
);

export const playAndQueueAtom = atom({
  tempPlaylist: [],
});

export const updatePlayAndQueueAtom = atom(
  (get) => get(playAndQueueAtom),
  async (_get, set, props) => {
    set(playAndQueueAtom, {
      currentTrack: props.track,
      tempPlaylist: props.tempPlaylist,
    });
  }
);
