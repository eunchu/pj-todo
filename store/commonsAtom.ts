import { atom } from "recoil";
import { v1 } from "uuid";

import { EMenu } from "./interfaces";

export const commonState = atom<EMenu>({
  key: `navMenu-${v1()}`,
  default: EMenu.BOARD,
});
