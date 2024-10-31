// App.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { useLocationTracking } from "./hooks/useLocationTracking";
import { useInterval } from "./hooks/useInterval";
import Navbar from "./components/Navbar/Navbar";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import Map from "./components/Map/Map";
import MetricBox from "./components/MetricBox/MetricBox";

const App: React.FC = () => {
  const [tracking, setTracking] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  // Use custom location tracking hook
  const { initialRegion, locationData, distance } =
    useLocationTracking(tracking);

  // Use custom interval hook for duration tracking
  useInterval(
    () => {
      if (tracking) setDuration((prev) => prev + 1);
    },
    tracking ? 1000 : null // Pass delay or null to stop interval
  );

  const startTracking = () => {
    setTracking(true);
    setDuration(0);
  };

  const stopTracking = () => {
    setTracking(false);
  };

  // Format duration in MM:SS format
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // Calculate pace (time per kilometer) in MM:SS format
  const calculatePace = () => {
    if (distance === 0) return "00:00";
    const paceInSeconds = Math.floor(duration / distance); // pace per km in seconds
    return formatDuration(paceInSeconds);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 24,
      }}
    >
      {tracking ? (
        <>
          {/* Display Duration and Distance Metrics */}
          <MetricBox
            metric={formatDuration(duration)}
            description={"Duration"}
          />
          <MetricBox
            metric={distance.toFixed(2)}
            description={"Distance"}
            unit="(km)"
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              marginBottom: 48,
            }}
          >
            <MetricBox
              metric={calculatePace()}
              description={"Pace"}
              unit="(min/km)"
              size="small"
            />
            <MetricBox
              metric={calculatePace()}
              description={"Avg. pace"}
              unit="(min/km)"
              size="small"
            />
          </View>
        </>
      ) : (
        <Map initialRegion={initialRegion} locationData={locationData} />
      )}

      <PrimaryButton
        handlePress={!tracking ? startTracking : stopTracking}
        trackingState={tracking}
      />
      <Navbar />
    </View>
  );
};

export default App;
