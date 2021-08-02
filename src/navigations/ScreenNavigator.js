
import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//* Screens
import LoginScreen from "../screens/LoginScreen";
import CountryList from "../screens/CountryListScreen";




const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
      <AuthStackNavigator.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#e6020b' },
      }}>
          <AuthStackNavigator.Screen
          name="Home"
          component={LoginScreen}
          />
            <AuthStackNavigator.Screen
          name="listScreen"
          component={CountryList}
          />
          
        </AuthStackNavigator.Navigator>
        
    );
  };




