import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constant/colors";

const OutlineButton = ({ onPress, icon, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.buttonStyle, pressed && styles.pressed]}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: Colors.primary500,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
