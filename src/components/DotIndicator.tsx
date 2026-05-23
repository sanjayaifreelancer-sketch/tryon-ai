import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

interface DotIndicatorProps {
  total: number;
  currentIndex: number;
  accentColors: string[];
}

export default function DotIndicator({
  total,
  currentIndex,
  accentColors,
}: DotIndicatorProps) {
  const animatedValues = useRef(
    Array.from({ length: total }, () => ({
      width: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    animatedValues.forEach((anim, i) => {
      Animated.timing(anim.width, {
        toValue: i === currentIndex ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  return (
    <View className="flex-row items-center justify-center" style={{ gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === currentIndex;
        const width = animatedValues[i].width.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 24],
        });

        return (
          <Animated.View
            key={i}
            style={{
              width,
              height: 8,
              borderRadius: 4,
              backgroundColor: isActive ? accentColors[i] : "#E5E7EB",
            }}
          />
        );
      })}
    </View>
  );
}
