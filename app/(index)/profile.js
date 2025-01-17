import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "../context/authContext";

const Profile = ({ navigation }) => {
  const { onLogout } = useAuth();

  const handleLogout = () => {
    onLogout();
    console.log("User logged out");
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.registerButton} onPress={handleLogout}>
        <Text style={styles.registerButtonText}>Logout</Text>
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
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
