import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

interface Hospital {
  name: string;
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const TOMTOM_API_KEY = process.env.EXPO_PUBLIC_TOMTOM_API_KEY;

  useEffect(() => {
    let isMounted = true;

    const getLocationAndHospitals = async () => {
      try {
        setError(null);

        const enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          throw new Error(
            "Location services are disabled. Please enable them in your device settings."
          );
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error(
            "Location permission is required to show nearby hospitals. Please grant permission in your device settings."
          );
        }

        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (isMounted) {
          setLocation(userLocation);
        }

        const response = await fetch(
          `https://api.tomtom.com/search/2/search/hospital.json?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&radius=5000&key=${TOMTOM_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch nearby hospitals. Please try again."
          );
        }

        const data = await response.json();
        const hospitalsData = data.results.map((item: any) => ({
          name: item.poi.name,
          latitude: item.position.lat,
          longitude: item.position.lon,
        }));

        if (isMounted) {
          setHospitals(hospitalsData);
        }
      } catch (error: any) {
        if (isMounted) {
          setError(
            error.message || "An unexpected error occurred. Please try again."
          );
          Alert.alert(
            "Error",
            error.message || "An unexpected error occurred. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getLocationAndHospitals();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading nearby hospitals...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: hospital.latitude,
                longitude: hospital.longitude,
              }}
              title={hospital.name}
              pinColor="red"
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default Home;
