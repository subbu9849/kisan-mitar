import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CloudSun, ShoppingBag, Sprout, Users } from 'lucide-react-native';

import DashboardScreen from '../screens/DashboardScreen';
import WeatherScreen from '../screens/WeatherScreen';
import MarketScreen from '../screens/MarketScreen';
import FarmScreen from '../screens/FarmScreen';
import CommunityScreen from '../screens/CommunityScreen';

const Tab = createBottomTabNavigator();

export default function FarmerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Home size={size} color={color} />;
          } else if (route.name === 'Weather') {
            return <CloudSun size={size} color={color} />;
          } else if (route.name === 'Market') {
            return <ShoppingBag size={size} color={color} />;
          } else if (route.name === 'Farm') {
            return <Sprout size={size} color={color} />;
          } else if (route.name === 'Community') {
            return <Users size={size} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Farm" component={FarmScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  );
}
