import 'styled-components/native';
import type { ThemeColors } from './tokens';

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeColors {
    mode?: 'light' | 'dark';
  }
}
