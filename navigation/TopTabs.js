import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Movies from "../screens/media/Movies";
import Search from "../screens/media/Search";
import Tv from "../screens/media/Tv";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const isDark = useColorScheme() === "light";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      screenOptions={{
        tabBarActiveTintColor: YELLOW_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 13,
          fontWeight: "600",
          alignItems: "center",
        },
        tabBarStyle:{
          backgroundColor: BLACK_COLOR,
        },
        tabBarIndicatorStyle:{
          backgroundColor: YELLOW_COLOR,
        }
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{ tabBarLabel: 'Movies' }}
      />
      <Tab.Screen
        name="Tvs"
        component={Tv}
        options={{ tabBarLabel: 'Tv' }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ tabBarLabel: 'Search' }}
      />
    </Tab.Navigator>
  );
};

export default TopTabs;