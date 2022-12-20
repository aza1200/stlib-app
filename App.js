import React, { useCallback, useEffect, useState } from 'react';
import { useColorScheme} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import Root from "./navigation/Root";
import { darkTheme } from "./styled";
import Realm from "realm";
import { DBContext } from "./screens/diary/Context";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [realm, setRealm] = useState(null);

  const isDark = useColorScheme() === "dark";
  useEffect(() => {
    async function prepare() {
      try {
        const connection = await Realm.open({
            path: "jhkimDB",
            schema: [FeelingSchema],
        });
        setRealm(connection);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <DBContext.Provider value={realm}>
          <NavigationContainer onReady={onLayoutRootView}>
            <Root />
          </NavigationContainer>
        </DBContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}