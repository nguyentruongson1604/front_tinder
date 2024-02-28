import React, {useEffect} from 'react';
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
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
import CardProfile from '../../components/CardProfile';

import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

function HomeScreen(): React.JSX.Element {
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
  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }));
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }));

  const swipeLeft = () => {
    console.log('quet trai');
  };
  const swipeRight = () => {
    console.log('quet phai');
  };
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
        return;
      }

      translateX.value = withSpring(
        event.velocityX > 0 ? hiddenTranslateX : -hiddenTranslateX,
        {},
        () => {
          //để trong callback func vì nếu ko để trong callback nó sẽ chạy runOnJS trước rồi mơis chạy withSpring để thay đổi UI
          //runOnJS(setCurrentIndex)(currentIndex+1)  //sau khi lướt thẻ đi thì cập nhật +1 cho thẻ mới
        },
      );

      const onSwipe = event.velocityX > 0 ? swipeLeft : swipeRight;
      onSwipe && runOnJS(onSwipe)();
    });

  //  sau khi lướt thẻ đi thì cập nhật +1 cho thẻ mới. Và ph xét cho giá trị của translateX.value tại vị trí ban đầu
  // useEffect(() => {
  //   translateX.value = 0;
  //   setNextIndex(currentIndex + 1);
  // }, [currentIndex]);
  return (
    <View style={styles.pageContainer}>
      <GestureHandlerRootView>
        <Animated.View style={[nextCardStyle, styles.nextCardContainer]}>
          <CardProfile />
        </Animated.View>
        <GestureDetector gesture={pan}>
          <Animated.View style={[cardStyle, styles.animatedWrap]}>
            <View style={styles.wrapLike}>
              <Animated.Image
                source={require('../../assets/images/LIKE.png')}
                style={[styles.likePic, likeStyle]}
                resizeMode="contain"
              />
              <Animated.Image
                source={require('../../assets/images/nope.png')}
                style={[styles.nopePic, nopeStyle]}
                resizeMode="contain"
              />
            </View>
            <CardProfile />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={styles.bottomNavigation}>
        <View style={styles.button}>
          <FontAwesome
            name="undo"
            style={{fontWeight: 'bold', fontSize: 30, color: '#FBD88D'}}
          />
        </View>
        <View style={styles.button}>
          <FontAwesome
            name="close"
            style={{fontWeight: 'bold', fontSize: 30, color: '#F76C6B'}}
          />
        </View>
        <View style={styles.button}>
          <FontAwesome
            name="star"
            style={{fontWeight: 'bold', fontSize: 24, color: '#3AB4CC'}}
          />
        </View>
        <View style={styles.button}>
          <FontAwesome
            name="heart"
            style={{fontWeight: 'bold', fontSize: 30, color: '#4FCC94'}}
          />
        </View>
        <View style={styles.button}>
          <Ionicons
            name="flash"
            style={{fontWeight: 'bold', fontSize: 30, color: '#A65CD2'}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
  animatedWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  wrapLike: {
    position: 'absolute',
    zIndex: 1,
    height: '60%',
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nopePic: {
    justifyContent: 'flex-start',
    width: 170,
    height: 170,
  },
  likePic: {
    width: 150,
    height: 150,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    paddingBottom: 40,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 10,
    marginBottom: 40,
    borderRadius: 50,
  },
});
export default HomeScreen;
