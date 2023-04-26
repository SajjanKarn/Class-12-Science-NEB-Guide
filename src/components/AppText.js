import { Text } from "react-native";

export default function AppText({
  variant = "Regular",
  children,
  onPress,
  textColor,
  ...props
}) {
  return (
    <Text
      style={{
        fontFamily: `Poppins-${variant}`,
        color: textColor ? textColor : "black",
        ...props.style,
      }}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
