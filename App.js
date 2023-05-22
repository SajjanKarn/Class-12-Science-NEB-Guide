import { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableNativeFeedback, useColorScheme } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";

import SubjectScreen from "./src/screens/SubjectScreen";
import SubjectTopicsScreen from "./src/screens/SubjectTopicsScreen";
import TopicScreen from "./src/screens/TopicScreen";
import AboutUs from "./src/screens/AboutUs";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";
import TermsCondition from "./src/screens/TermsCondition";

import Loader from "./src/components/Loader";

import { API_URL, CDA_ACCESS_TOKEN } from "./src/config/api";

import "expo-dev-client";
import colors from "./src/config/colors";
import ThemeContext, { ThemeContextProvider } from "./src/context/ThemeContext";
import ImporantQuestions from "./src/screens/ImporantQuestions";

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

const AppStack = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="SubjectScreen"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Poppins-Bold",
          color: isDarkMode ? colors.dark.textColor : colors.light.textColor,
        },
        headerStyle: {
          backgroundColor: isDarkMode
            ? colors.dark.cardBackground
            : colors.light.white,
        },

        headerTintColor: isDarkMode
          ? colors.dark.textColor
          : colors.light.textColor,
      }}
    >
      <Stack.Screen
        name="SubjectScreen"
        component={SubjectScreen}
        options={{
          headerTitle: "Home",

          headerRight: () => {
            const navigation = useNavigation();

            return (
              <TouchableNativeFeedback
                onPress={() =>
                  console.log("This feature is not available yet.")
                }
              >
                <Menu>
                  <MenuTrigger
                    children={
                      <AntDesign
                        name="ellipsis1"
                        size={24}
                        color={
                          isDarkMode
                            ? colors.dark.textColor
                            : colors.light.textColor
                        }
                      />
                    }
                  />
                  <MenuOptions
                    customStyles={{
                      optionWrapper: {
                        padding: 10,
                        paddingVertical: 15,
                        backgroundColor: isDarkMode
                          ? colors.dark.cardBackground
                          : colors.light.white,
                      },
                    }}
                  >
                    <MenuOption
                      onSelect={() => navigation.navigate("AboutUs")}
                      text="About Us"
                      customStyles={{
                        optionText: {
                          color: isDarkMode
                            ? colors.dark.textColor
                            : colors.light.textColor,
                        },
                      }}
                    />
                    <MenuOption
                      onSelect={() => navigation.navigate("PrivacyPolicy")}
                      text="Privacy Policy"
                      customStyles={{
                        optionText: {
                          color: isDarkMode
                            ? colors.dark.textColor
                            : colors.light.textColor,
                        },
                      }}
                    />
                    <MenuOption
                      onSelect={() => navigation.navigate("TermsCondition")}
                      text="Terms & Condition"
                      customStyles={{
                        optionText: {
                          color: isDarkMode
                            ? colors.dark.textColor
                            : colors.light.textColor,
                        },
                      }}
                    />
                  </MenuOptions>
                </Menu>
              </TouchableNativeFeedback>
            );
          },

          // toggle theme button
          headerLeft: () => {
            return (
              <TouchableNativeFeedback
                onPress={() => {
                  toggleTheme();
                }}
              >
                <Feather
                  name={isDarkMode ? "sun" : "moon"}
                  size={20}
                  color={
                    isDarkMode ? colors.dark.textColor : colors.light.textColor
                  }
                  style={{ marginLeft: 5, marginRight: 10, padding: 15 }}
                />
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
        }}
      />
      <Stack.Screen
        name="TopicScreen"
        component={TopicScreen}
        options={{
          headerTitle: "Topic",
        }}
      />
      <Stack.Screen
        name="ImportantQuestions"
        component={ImporantQuestions}
        options={{
          headerTitle: "Important Questions",
        }}
      />

      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerTitle: "About Us",
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerTitle: "Privacy Policy",
        }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{
          headerTitle: "Terms & Condition",
        }}
      />
    </Stack.Navigator>
  );
};

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
      <ThemeContextProvider>
        <NavigationContainer>
          <MenuProvider>
            <AppStack />
          </MenuProvider>
        </NavigationContainer>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}
