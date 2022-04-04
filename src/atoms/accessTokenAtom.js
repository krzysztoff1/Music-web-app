import { atomWithStorage } from "jotai/utils";

export const accessTokenAtom = atomWithStorage({
  token: undefined,
  expire: undefined,
});
