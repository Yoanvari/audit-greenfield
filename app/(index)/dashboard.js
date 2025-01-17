import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>dashboard</Text>
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
});

export default Dashboard;
