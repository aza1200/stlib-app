import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { BLACK_COLOR,LIGHT_GREY} from "../colors";


const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackVisible:false,
        headerStyle: {
          backgroundColor: BLACK_COLOR,
        },
        headerTitleStyle: {
          color:  "white",
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};
export default Stack;