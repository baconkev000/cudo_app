import { StyleSheet, Animated, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Paginator({ data, scrollX, onDotPress }) {
  const { width } = useWindowDimensions();
  const dotSize = 50; // Size of the visible dots
  const dotMargin = 4; // Margin between dots
  const dotsToShow = 3; // Number of dots to show at a time

  // Calculate the width of the ScrollView to fit exactly 3 dots
  const scrollViewWidth = (dotSize + dotMargin * 2) * dotsToShow - dotMargin;

  // Calculate the snap interval to be the width of each dot including margins
  const snapInterval = dotSize + dotMargin * 2;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ justifyContent: 'center', backgroundColor: 'grey' }}
        style={{ width: scrollViewWidth }}
        snapToInterval={snapInterval} // Snap to each dot
        decelerationRate="fast"
      >
        {data.map((item, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          // Interpolate borderWidth based on scroll position
          const borderWidth = scrollX.interpolate({
            inputRange,
            outputRange: [0, 2, 0], // 2 for active, 0 for inactive
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              key={i.toString()}
              onPress={() => onDotPress(i)} // Call the handler with the index
            >
              <Animated.View
                style={[
                  styles.dot,
                  {
                    width: dotSize,
                    height: dotSize,
                    borderWidth,
                    transform: [{ scale }],
                    backgroundColor: item.bgColor,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dot: {
    borderRadius: 100, // Adjusted to match half of dotSize for circular shape
    marginHorizontal: 4,
    borderColor: 'black', // or any other color you prefer for the border
  },
});
