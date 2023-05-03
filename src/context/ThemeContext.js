import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, useColorScheme } from "react-native";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === "dark");

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    AsyncStorage.setItem("theme", (!isDarkMode).toString());
    ToastAndroid.show("Theme changed", ToastAndroid.SHORT);
  };

  const restoreTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      if (theme) {
        setIsDarkMode(theme === "true");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    restoreTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
