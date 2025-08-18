import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Favorites from '../screens/Favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabsParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabsParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'בית' }} />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'מועדפים' }}
      />
    </Tab.Navigator>
  );
}
