import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    headerColor: string;
    bgColor: string;
    boardColor: string;
    cardColor: string;
    borderColor: string;
    infoBgColor: string;
  }
}
