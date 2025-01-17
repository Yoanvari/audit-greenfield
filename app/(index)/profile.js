import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import { useAuth } from "../context/authContext";

const Profile = ({ navigation }) => {
  const { authState, onLogout } = useAuth();

  const handleLogout = () => {
    onLogout();
    console.log("User logged out");
    Alert.alert("Success", "Logout successfully!");
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 100);
  };

  return (
    <View style={styles.container}>
      {/* Nama Pengguna */}
      <Text style={styles.name}>{authState.user.name}</Text>
      {/* Email Pengguna */}
      <Text style={styles.email}>{authState.user.email}</Text>

      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  logoutButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#dc3545", // Warna merah untuk tombol logout
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
