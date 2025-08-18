import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider as StyledProvider } from 'styled-components/native';
import { lightTheme, darkTheme, type ThemeColors } from './tokens';

export type ThemeMode = 'system' | 'light' | 'dark';

type Ctx = {
  mode: ThemeMode;
  effective: 'light' | 'dark';
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
};

const ThemeModeCtx = createContext<Ctx | null>(null);

export function ThemeModeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('system');
  const scheme = useColorScheme(); // 'light' | 'dark' | null

  const effective: 'light' | 'dark' =
    mode === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : mode;

  const theme: ThemeColors = effective === 'dark' ? darkTheme : lightTheme;

  const value = useMemo<Ctx>(
    () => ({
      mode,
      effective,
      setMode,
      toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode, effective],
  );

  return (
    <ThemeModeCtx.Provider value={value}>
      <StyledProvider theme={{ ...theme, mode: effective }}>
        <StatusBar
          barStyle={effective === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.background}
        />
        {children}
      </StyledProvider>
    </ThemeModeCtx.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeCtx);
  if (!ctx)
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
}
