import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SubjectScreen from "./src/screens/SubjectScreen";
import SubjectTopicsScreen from "./src/screens/SubjectTopicsScreen";
import TopicScreen from "./src/screens/TopicScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
