import React from 'react';
import RootNavigator from './src/stackNavigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import './src/i18n';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
}
