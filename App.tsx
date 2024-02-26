import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import CardProfile from './src/components/CardProfile';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

function App(): React.JSX.Element {
  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );
  const scale = useDerivedValue(() =>
    interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.8, 1],
    ),
  );
  const opacity = useDerivedValue(() =>
    interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  );
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
    opacity: opacity.value,
  }));
  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, context) => {
  //     context.startX = translateX.value;
  //   },
  //   onActive: (event, context) => {
  //     translateX.value = context.startX + event.translationX;
  //   },
  //   onEnd: event => {
  //   }})
  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate(event => {
      translateX.value = startX.value + event.translationX;
    })
    .onFinalize(event => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
      }
    });
  return (
    <View style={styles.pageContainer}>
      <GestureHandlerRootView>
        <Animated.View style={[nextCardStyle, styles.nextCardContainer]}>
          <CardProfile />
        </Animated.View>
        <GestureDetector gesture={pan}>
          <Animated.View style={[cardStyle, styles.animatedWrap]}>
            <CardProfile />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
export default App;

// import React, {useEffect, useState} from 'react';
// import Geolocation from '@react-native-community/geolocation';
// import {View, Text} from 'react-native';

// const App = () => {
//   const [location, setLocation] = useState<any>(null);

//   useEffect(() => {
//     // Lấy vị trí hiện tại của người dùng
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setLocation({latitude, longitude});
//         console.log({latitude, longitude});
//       },
//       error => console.log(error),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//     );

//     // Lắng nghe sự thay đổi vị trí (nếu cần)
//     const watchId = Geolocation.watchPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setLocation({latitude, longitude});
//       },
//       error => console.log(error),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//     );

//     // Hủy bỏ lắng nghe khi component bị unmounted
//     return () => Geolocation.clearWatch(watchId);
//   }, []);

//   return (
//     <View>
//       <Text>Latitude: {location?.latitude}</Text>
//       <Text>Longitude: {location?.longitude}</Text>
//     </View>
//   );
// };

// export default App;
