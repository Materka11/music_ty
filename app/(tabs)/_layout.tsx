import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { COLORS } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.dark.text,
        tabBarInactiveTintColor: COLORS.dark.placeholder,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 20,
          },
          default: {
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 10,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="search" size={28} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Search</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
});
