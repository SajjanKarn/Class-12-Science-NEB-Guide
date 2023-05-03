import { Text } from "react-native";
import colors from "../config/colors";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function AppText({
  variant = "Regular",
  children,
  onPress,
  textColor,
  ...props
}) {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: `Poppins-${variant}`,
        color: isDarkMode ? colors.dark.textColor : colors.light.textColor,
        ...props.style,
      }}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
