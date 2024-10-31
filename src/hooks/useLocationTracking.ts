import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Coordinate } from "../types/index";
import { Region } from "react-native-maps";

// Helper function to calculate distance using Haversine formula
const haversine = (coords1: Coordinate, coords2: Coordinate): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

export const useLocationTracking = (tracking: boolean) => {
  const [locationData, setLocationData] = useState<Coordinate[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  // Set initial location on mount
  useEffect(() => {
    const setInitialLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.003, // Sets zoom level
        longitudeDelta: 0.003, // Sets zoom level
      });
    };

    setInitialLocation();
  }, []);

  // Track location when `tracking` is true
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const startTracking = async () => {
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every second
          distanceInterval: 10, // Update every meter
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          const newCoordinate: Coordinate = { latitude, longitude };

          setLocationData((prevData) => {
            const updatedData = [...prevData, newCoordinate];

            if (updatedData.length > 1) {
              const lastLocation = updatedData[updatedData.length - 2];
              const distanceTravelled = haversine(lastLocation, newCoordinate);
              setDistance((prevDistance) => prevDistance + distanceTravelled);
            }

            return updatedData;
          });
        }
      );
    };

    if (tracking) {
      // Reset distance and location data when tracking starts
      setDistance(0);
      setLocationData([]);
      startTracking();
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [tracking]);

  return { initialRegion, locationData, distance };
};
