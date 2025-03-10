import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        const message = "Permission to access location was denied";
        setErrorMsg(message);
        Alert.alert("Permission Denied", message);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  if (!location) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  // Define the initial region for the map, with type annotation.
  const initialRegion: Region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Render the MapView with a Marker at the user's location.
  return (
    <Container>
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
        />
      </MapView>
    </Container>
  );
};

export default MapScreen;
