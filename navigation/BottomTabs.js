import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Animation from "../screens/Animation";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";
import { 
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  FontAwesome
  } from "@expo/vector-icons";
import DragAndDrop from "../screens/DragAndDrop";
import Medias from "../screens/media/Movies";
import DiaryNavigator from "../screens/diary/DiaryHome";
import TopTabs from "./TopTabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const DiaryTab= createNativeStackNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "light";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      screenOptions={{
        headerShown:false,
        unmountOnBlur:true,
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <TopTab.Screen 
        name="Medias" 
        component={TopTabs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={"live-tv"} color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen
        name="Animation"
        component={Animation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={"animation-play"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DragAndDrop"
        component={DragAndDrop}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"dropbox"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pencil-square-o" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;