import { Region, UserLocationChangeEvent } from "react-native-maps";
import { Coordinate } from "../../types";

interface MapProps {
  initialRegion: Region | null;
  locationData?: Coordinate[];
}

export default MapProps;
