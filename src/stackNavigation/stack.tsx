import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import { HeaderTitle } from '@react-navigation/elements';

import { RootStackParamList } from '../types/navigation';
import BookDetails from '../screens/BookDetails/BookDetails';
import FavoriteHeaderRight from '../components/FavoriteHeaderRight/FavoriteHeaderRight';
import { SPACING } from '../consts';
import { useWindowDimensions, View } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { width } = useWindowDimensions();
  const TITLE_MAX = Math.max(0, width - SPACING * 2);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTitleAlign: 'left',
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={({ route }) => ({
            headerTitle: props => (
              <View
                style={{
                  maxWidth: TITLE_MAX,
                  flexShrink: 1,
                  padding: 10,
                }}
              >
                <HeaderTitle
                  {...props}
                  numberOfLines={2}
                  style={{
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {route.params?.title ?? 'Book'}
                </HeaderTitle>
              </View>
            ),
            headerRight: () =>
              route.params?.number != null ? (
                <FavoriteHeaderRight number={route.params.number} />
              ) : null,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
