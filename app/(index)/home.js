import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "./dashboard";
import Profilecreen from "./profile";
import FormScreen from "./form";
import DataScreen from "./data";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Form" component={FormScreen} />
      <Tab.Screen name="Data" component={DataScreen} />
      <Tab.Screen name="Profile" component={Profilecreen} />
    </Tab.Navigator>
  );
};

export default Home;
