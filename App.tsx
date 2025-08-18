import React from 'react';
import RootNavigator from './src/stackNavigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import './src/i18n';
import { ThemeModeProvider } from './src/theme/ThemeModeProvider';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeModeProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </ThemeModeProvider>
      </PersistGate>
    </Provider>
  );
}
