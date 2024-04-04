/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
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
import CardProfile from '../../components/templates/CardProfile';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useActivityStore} from '../../store';
import {observer} from 'mobx-react-lite';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;
const HomeScreen = observer(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 1.5 * screenWidth;
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const activityStore = useActivityStore();

  // const [currentProfile, setCurrentProfile] = useState(
  //   activityStore.listProfile[0],
  // );
  // const [nextProfile, setNextProfile] = useState(activityStore.listProfile[0]);

  // console.log('inhome list', activityStore.listProfile.length);
  // console.log('inhome list', activityStore.listProfile);
  // console.log('inhome listId', activityStore.idArray);
  // console.log(activityStore.listProfile.length);
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

  const otherButton = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX / 5, 0, hiddenTranslateX / 5],
      [0, 1, 0],
    ),
  }));
  const likeButton = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }));
  const swipeLeft = () => {
    console.log('quet trai');
    // setTimeout(() => {
    setNextIndex(currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
    activityStore.deletePersonFromList();
    // }, 500);
    activityStore.addOnePersonToList();

    // setTimeout(() => {
    //   translateX.value = 0;
    // }, 0);
    // setNextIndex(currentIndex + 1);
  };
  const swipeRight = async () => {
    console.log('quet phai');
    // setTimeout(() => {
    setNextIndex(currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
    activityStore.deletePersonFromList();
    // }, 500);
    activityStore.addOnePersonToList();

    // setTimeout(() => {
    //   translateX.value = 0;
    // }, 0);
    // setNextIndex(currentIndex + 1);
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
          // runOnJS(setCurrentIndex)(currentIndex + 1); //sau khi lướt thẻ đi thì cập nhật +1 cho thẻ mới
        },
      );

      const onSwipe = event.velocityX > 0 ? swipeLeft : swipeRight;
      // const abc = () => {
      //   setNextIndex(currentIndex + 1);
      //   translateX.value = 0;
      // };
      onSwipe && runOnJS(onSwipe)();
      // runOnJS(onSwipe)()
    });

  //  sau khi lướt thẻ đi thì cập nhật +1 cho thẻ mới. Và ph xét cho giá trị của translateX.value tại vị trí ban đầu
  useEffect(() => {
    setNextIndex(1);
    setCurrentIndex(0);
    translateX.value = 0;
  }, [currentIndex, nextIndex, translateX]);

  // useEffect(() => {
  //   translateX.value = 0;
  // }, [translateX]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.pageContainer}>
        <GestureHandlerRootView style={{height: '100%'}}>
          <Animated.View style={[nextCardStyle, styles.nextCardContainer]}>
            <CardProfile user={activityStore.listProfile[nextIndex]} />
          </Animated.View>
          <GestureDetector gesture={pan}>
            <Animated.View style={[cardStyle, styles.animatedWrap]}>
              {/* <View style={styles.wrapLike}> */}
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
              {/* </View> */}
              <CardProfile user={activityStore.listProfile[currentIndex]} />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
      <View style={styles.bottomNavigation}>
        <Animated.View style={[styles.button]}>
          <FontAwesome
            name="undo"
            style={{fontWeight: 'bold', fontSize: 30, color: '#FBD88D'}}
          />
        </Animated.View>
        <Pressable
          onPress={() => {
            translateX.value = withSpring(-hiddenTranslateX, {
              damping: 900, // Tăng giá trị này để giảm tốc độ
              stiffness: 900, // Giảm giá trị này để làm chậm animation
              mass: 13, // Tăng giá trị này để animation có vẻ nặng nề hơn
            });
            setTimeout(() => {
              setNextIndex(currentIndex + 1);
              setCurrentIndex(currentIndex + 1);
              activityStore.deletePersonFromList();
              activityStore.addOnePersonToList();
            }, 300);
          }}>
          <View style={[styles.button]}>
            <FontAwesome
              name="close"
              style={{fontWeight: 'bold', fontSize: 30, color: '#F76C6B'}}
            />
          </View>
        </Pressable>
        <View style={styles.button}>
          <FontAwesome
            name="star"
            style={{fontWeight: 'bold', fontSize: 24, color: '#3AB4CC'}}
          />
        </View>
        <Pressable
          onPress={() => {
            translateX.value = withSpring(hiddenTranslateX, {
              damping: 900, // Tăng giá trị này để giảm tốc độ
              stiffness: 900, // Giảm giá trị này để làm chậm animation
              mass: 13, // Tăng giá trị này để animation có vẻ nặng nề hơn
            });
            setTimeout(() => {
              setNextIndex(currentIndex + 1);
              setCurrentIndex(currentIndex + 1);
              activityStore.deletePersonFromList();
              activityStore.addOnePersonToList();
            }, 300);
          }}>
          <View style={styles.button}>
            <FontAwesome
              name="heart"
              style={{fontWeight: 'bold', fontSize: 30, color: '#4FCC94'}}
            />
          </View>
        </Pressable>
        <View style={styles.button}>
          <Ionicons
            name="flash"
            style={{fontWeight: 'bold', fontSize: 30, color: '#A65CD2'}}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
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
    zIndex: 4,
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nopePic: {
    // justifyContent: 'flex-start',
    width: 170,
    height: 170,
    position: 'absolute',
    zIndex: 4,
    top: 130,
    right: 40,
  },
  likePic: {
    width: 150,
    height: 150,
    position: 'absolute',
    zIndex: 4,
    top: 130,
    left: 40,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    // backgroundColor: 'yellow',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 10,
    borderRadius: 50,
  },
});
export default HomeScreen;
