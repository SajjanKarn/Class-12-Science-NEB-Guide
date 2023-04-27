import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SubjectScreen from "./src/screens/SubjectScreen";
import SubjectTopicsScreen from "./src/screens/SubjectTopicsScreen";
import TopicScreen from "./src/screens/TopicScreen";

import Loader from "./src/components/Loader";

import { API_URL, CDA_ACCESS_TOKEN } from "./src/config/api";
import { AntDesign } from "@expo/vector-icons";
import { TouchableNativeFeedback } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import AboutUs from "./src/screens/AboutUs";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";

import { useNavigation } from "@react-navigation/native";

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
        headerRight: () => {
          const navigation = useNavigation();

          return (
            <TouchableNativeFeedback
              onPress={() => console.log("This feature is not available yet.")}
            >
              <Menu>
                <MenuTrigger
                  children={
                    <AntDesign name="ellipsis1" size={24} color="black" />
                  }
                />
                <MenuOptions
                  customStyles={{
                    optionWrapper: {
                      padding: 10,
                      paddingVertical: 15,
                    },
                  }}
                >
                  <MenuOption
                    onSelect={() => navigation.navigate("AboutUs")}
                    text="About Us"
                  />
                  <MenuOption
                    onSelect={() => navigation.navigate("PrivacyPolicy")}
                    text="Privacy Policy"
                  />
                </MenuOptions>
              </Menu>
            </TouchableNativeFeedback>
          );
        },
      }}
    />
    <Stack.Screen
      name="SubjectTopicsScreen"
      component={SubjectTopicsScreen}
      options={{
        headerTitle: "Choose a Topic",
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
    <Stack.Screen
      name="AboutUs"
      component={AboutUs}
      options={{
        headerTitle: "About Us",
        headerTitleStyle: {
          fontFamily: "Poppins-Bold",
        },
      }}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicy}
      options={{
        headerTitle: "Privacy Policy",
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
        <MenuProvider>
          <AppStack />
        </MenuProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
