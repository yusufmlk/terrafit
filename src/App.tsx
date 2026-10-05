import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";

export default function HomeScreen() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocation = async () => {
    setErrorMsg(null);

    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Location permission was denied.");
      return;
    }

    const currentLocation =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

    setLocation(currentLocation);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TERRAFIT</Text>

      <Text style={styles.subtitle}>
        Territory Fitness Game
      </Text>

      {errorMsg && (
        <Text style={styles.error}>{errorMsg}</Text>
      )}

      {location ? (
        <View style={styles.locationBox}>
          <Text style={styles.active}>GPS ACTIVE</Text>

          <Text>
            Latitude: {location.coords.latitude.toFixed(6)}
          </Text>

          <Text>
            Longitude: {location.coords.longitude.toFixed(6)}
          </Text>

          <Text>
            Accuracy:{" "}
            {location.coords.accuracy?.toFixed(1)} m
          </Text>
        </View>
      ) : (
        <Text>Getting your location...</Text>
      )}

      <Button
        title="Get My Location"
        onPress={getLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },

  locationBox: {
    alignItems: "center",
    gap: 8,
    marginBottom: 30,
  },

  active: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  error: {
    marginBottom: 20,
  },
});