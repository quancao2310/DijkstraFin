import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import TempScreen from "../screens/TempScreen";
import {
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import WalletScreen from "../screens/Wallet/WalletScreen";
import ColorSystem from "../color/ColorSystem";
import GoalScreen from "../screens/Goal/GoalScreen";
import StatisticScreen from "../screens/Statistic/StatisticScreen";
const Tab = createBottomTabNavigator();
export default function BottomBarNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: ColorSystem.primary[700],
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }, // Background color
        tabBarActiveTintColor: ColorSystem.neutral[100], // Active tab label color
        tabBarInactiveTintColor: ColorSystem.neutral[400], // Inactive tab label color
      }}
    >
      <Tab.Screen
        name="Tổng quan"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <SimpleLineIcons
              name="home"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ví của bạn"
        component={WalletScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialIcons
              name="wallet"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Kế hoạch"
        component={GoalScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="piggy-bank-outline"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Thống kê"
        component={StatisticScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialIcons
              name="auto-graph"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Khác"
        component={TempScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="menu"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
