import { atom } from "jotai";
import { currentPlaylistAtom } from "./currentPlaylistAtom";

export const playAndQueueAtom = atom({
  currentTrack: {},
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
