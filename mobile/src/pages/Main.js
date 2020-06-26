import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Mapview, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";

import api from "../services/api";

function Main({ navigation }) {
  // Create the State to store the info
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  // Every time the user changes the map, the currentRegion will be updated
  function handleRegionChange(region) {
    // console.log(region);

    setCurrentRegion(region);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    // Getting the info from the api
    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    console.log(response.data.devs);

    // Setting the data that we got from the api
    setDevs(response.data.devs);
  }

  return (
    <>
      <Mapview
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs.map((dev) => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: dev.avatar_url,
              }}
            />
            <Callout
              onPress={() => {
                // Navigation to the next page
                navigation.navigate("Profile", {
                  github_username: dev.github_username,
                });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </Mapview>
      <KeyboardAvoidingView
        style={styles.searchForm}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 110 : 0}
        enabled={Platform.OS === "ios" ? true : false}
        style={styles.searchForm}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search Devs by Techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  devBio: {
    color: "#666",
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row",
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8E4Dff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
});

export default Main;
