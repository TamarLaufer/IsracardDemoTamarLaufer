export type ThemeColors = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  inputBackground: string;
  accent: string;
};

export const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F7F7F7',
  textPrimary: '#111111',
  textSecondary: '#666666',
  border: '#E6E6E6',
  inputBackground: '#F2F2F2',
  accent: '#3B82F6',
};

export const darkTheme: ThemeColors = {
  background: '#0B0B0E',
  surface: '#151821',
  textPrimary: '#F5F5F5',
  textSecondary: '#A0A0A0',
  border: '#262B36',
  inputBackground: '#1B1F2A',
  accent: '#60A5FA',
};
