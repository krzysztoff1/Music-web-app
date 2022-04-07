import { atom } from "jotai";

const sections = [
  { title: "saved", url: "/saved_tracks" },
  { title: "artists", url: "/artists/" },
];

export const currentPlaylistAtom = atom();
