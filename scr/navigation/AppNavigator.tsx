
import React from 'react';

import { View, Text } from 'react-native';

import { NavigationContainer } from
  '@react-navigation/native';

import { createNativeStackNavigator } from
  '@react-navigation/native-stack';

import { createBottomTabNavigator } from
  '@react-navigation/bottom-tabs';

import { User } from 'firebase/auth';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor: '#1565C0',

        tabBarInactiveTintColor: '#888888',

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
          backgroundColor: '#FFFFFF',
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },

        tabBarIcon: ({ focused }) => {

          const icons: any = {
            Home: '🏠',
            Search: '🔍',
            Profile: '👤',
          };

          return (
            <View
              style={{
                opacity: focused ? 1 : 0.55,
              }}
            >
              <Text style={{ fontSize: 21 }}>
                {icons[route.name]}
              </Text>
            </View>
          );

        },

      })}

    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />


      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>

  );

}

interface Props {
  user: User | null;
}

export default function AppNavigator({ user }: Props) {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {user ? (

          <Stack.Screen
            name="Main"
            component={MainTabs}
          />

        ) : (

          <>

            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />

          </>

        )}

      </Stack.Navigator>

    </NavigationContainer>

  );

}
