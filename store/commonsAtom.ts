import { atom } from "recoil";
import { EMenu } from "./interfaces";

export const commonState = atom<EMenu>({
  key: "navMenu",
  default: EMenu.BOARD,
});
