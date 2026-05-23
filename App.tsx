import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import TryOnScreen from "./src/screens/TryOnScreen";
import SubscriptionScreen from "./src/screens/SubscriptionScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";

const ONBOARDING_KEY = "@tryonai_onboarding_complete";
const Stack = createNativeStackNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
      setShowOnboarding(value !== "true");
    });
  }, []);

  const finishOnboarding = useCallback(() => {
    AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  }, []);

  if (showOnboarding === null) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#F59E0B" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {showOnboarding ? (
            <Stack.Screen name="Onboarding">
              {(props) => (
                <OnboardingScreen
                  {...props}
                  onFinish={finishOnboarding}
                />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main" component={BottomTabNavigator} />
              <Stack.Screen
                name="TryOn"
                component={TryOnScreen}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="Subscription"
                component={SubscriptionScreen}
                options={{
                  animation: "slide_from_bottom",
                  presentation: "modal",
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
