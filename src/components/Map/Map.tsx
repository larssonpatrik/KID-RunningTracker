import MapView, { Polyline } from "react-native-maps";
import MapProps from "./Map.types";

const Map: React.FC<MapProps> = ({ initialRegion, locationData }) => {
  return (
    initialRegion && (
      <MapView
        style={{ width: "100%", height: "70%" }}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {locationData && (
          <Polyline
            coordinates={locationData}
            strokeColor="blue"
            strokeWidth={4}
          />
        )}
      </MapView>
    )
  );
};

export default Map;
