import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      bg: string;
      primary: string;
      secondary: string;
      error: string;
      disable: string;
      dashboardBox: string;
    };
  }
}
