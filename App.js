import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SubjectScreen from "./src/screens/SubjectScreen";
import SubjectTopicsScreen from "./src/screens/SubjectTopicsScreen";
import TopicScreen from "./src/screens/TopicScreen";

import Loader from "./src/components/Loader";

import { API_URL, CDA_ACCESS_TOKEN } from "./src/config/api";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: API_URL,
  cache,
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer ${CDA_ACCESS_TOKEN}`,
  },
});

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator initialRouteName="SubjectScreen">
    <Stack.Screen
      name="SubjectScreen"
      component={SubjectScreen}
      options={{
        headerTitle: "Home",
        headerTitleStyle: {
          fontFamily: "Poppins-Bold",
        },
      }}
    />
    <Stack.Screen
      name="SubjectTopicsScreen"
      component={SubjectTopicsScreen}
      options={{
        headerTitle: "Physics",
        headerTitleStyle: {
          fontFamily: "Poppins-Bold",
        },
      }}
    />
    <Stack.Screen
      name="TopicScreen"
      component={TopicScreen}
      options={{
        headerTitle: "Physics",
        headerTitleStyle: {
          fontFamily: "Poppins-Bold",
        },
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);
  const [fontsLoaded] = useFonts({
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
  });

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) {
    return <Loader />;
  }

  if (!fontsLoaded) {
    return <Loader />;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}
