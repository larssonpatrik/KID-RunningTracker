import { StyleSheet, Text, View } from "react-native";
import MetricBoxProps from "./MetricBox.types";

const MetricBox: React.FC<MetricBoxProps> = ({
  metric,
  description,
  unit,
  size = "large",
}) => {
  return (
    <View
      style={
        size === "large" ? styles.boxContainerLarge : styles.boxContainerSmall
      }
    >
      <Text style={styles.description}>{description}</Text>
      <Text
        style={size === "large" ? styles.metricsLarge : styles.metricsSmall}
      >
        {metric}
      </Text>
      {unit && <Text style={styles.unit}>{unit}</Text>}
    </View>
  );
};

export default MetricBox;

const styles = StyleSheet.create({
  boxContainerLarge: {
    display: "flex",
    alignItems: "center",
    width: 345,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 12,
  },
  boxContainerSmall: {
    display: "flex",
    alignItems: "center",
    width: 160,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 12,
    gap: 4,
  },
  description: {
    color: "gray",
    fontSize: 18,
    fontWeight: "medium",
  },
  unit: {
    fontSize: 18,
    fontWeight: "medium",
  },
  metricsLarge: {
    fontSize: 80,
    fontWeight: "bold",
  },
  metricsSmall: {
    fontSize: 42,
    fontWeight: "bold",
  },
});
