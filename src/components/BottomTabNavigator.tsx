import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import WardrobeScreen from "../screens/WardrobeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function ExplorePlaceholder() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl">🔍</Text>
      <Text className="text-lg text-[#6B7280] mt-2">Explore</Text>
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#F59E0B",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>👗</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExplorePlaceholder}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🔍</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
