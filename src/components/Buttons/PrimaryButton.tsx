import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import ButtonProps from "./Button.types";

const PrimaryButton: React.FC<ButtonProps> = ({
  handlePress,
  trackingState,
}) => {
  return (
    <TouchableOpacity
      style={!trackingState ? styles.primaryButton : styles.secondaryButton}
      onPress={handlePress}
    >
      <Text style={{ fontSize: 15, fontWeight: 500, color: "white" }}>
        {!trackingState ? "Start run" : "End Run"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 345,
    height: 40,
    backgroundColor: "#51A4ED",
    borderRadius: 8,
  },
  secondaryButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 345,
    height: 40,
    borderRadius: 8,
    backgroundColor: "red",
  },
});

export default PrimaryButton;
