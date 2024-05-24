/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

import CardProfile from '../../components/templates/CardProfile';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useActivityStore, useProfileStore, useSocket} from '../../store';
import {observer} from 'mobx-react-lite';
import MatchScreen from '../MatchScreen';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';

const HomeScreen = observer(() => {
  const [openMatchScreen, setOpenMatchScreen] = useState<boolean>(false);
  const [dataInMatch, setDataInMatch] = useState({});
  const navigation = useNavigation();
  const activityStore = useActivityStore();
  const profileStore = useProfileStore();
  const socket = useSocket();
  const swiperRef = useRef<Swiper<any>>(null);
  const [swiping, setSwiping] = React.useState<boolean>(false);
  const swipeRight = async user => {
    const res = await activityStore.updateActivity(user, 'Like');
    await activityStore.addOnePersonToList();
    if (res) {
      setOpenMatchScreen(true);
      setDataInMatch(user);
      const res = await profileStore.updateListMatch(user);
      socket.emit('sendNewMatch', res);
    }
  };
  const swipeLeft = async user => {
    await activityStore.updateActivity(user, 'Unlike');
    await activityStore.addOnePersonToList();
  };

  const handlePressMessage = () => {
    setOpenMatchScreen(false);
    navigation.navigate('Message');
  };
  const handlePressHome = () => {
    setOpenMatchScreen(false);
    navigation.navigate('Switch');
  };
  // const cards = [
  //   {text: 'Card 1', color: '#24C6DC'},
  //   {text: 'Card 2', color: '#514A9D'},
  //   {text: 'Card 3', color: '#FFC65D'},
  //   // thêm nhiều card tùy ý
  // ];

  return (
    // <View style={{flex: 1}}>
    //   <View style={styles.pageContainer}>
    //     <GestureHandlerRootView style={{height: '100%'}}>
    //       <Animated.View style={[nextCardStyle, styles.nextCardContainer]}>
    //         <CardProfile user={activityStore.listProfile[nextIndex]} />
    //       </Animated.View>
    //       <GestureDetector gesture={pan}>
    //         <Animated.View style={[cardStyle, styles.animatedWrap]}>
    //           {/* <View style={styles.wrapLike}> */}
    //           <Animated.Image
    //             source={require('../../assets/images/LIKE.png')}
    //             style={[styles.likePic, likeStyle]}
    //             resizeMode="contain"
    //           />
    //           <Animated.Image
    //             source={require('../../assets/images/nope.png')}
    //             style={[styles.nopePic, nopeStyle]}
    //             resizeMode="contain"
    //           />
    //           {/* </View> */}
    //           <CardProfile user={activityStore.listProfile[currentIndex]} />
    //         </Animated.View>
    //       </GestureDetector>
    //     </GestureHandlerRootView>
    //   </View>
    //   <View style={styles.bottomNavigation}>
    //     <Animated.View style={[styles.button]}>
    //       <FontAwesome
    //         name="undo"
    //         style={{fontWeight: 'bold', fontSize: 30, color: '#FBD88D'}}
    //       />
    //     </Animated.View>
    //     <Pressable
    //       onPress={() => {
    //         translateX.value = withSpring(-hiddenTranslateX, {
    //           damping: 900, // Tăng giá trị này để giảm tốc độ
    //           stiffness: 900, // Giảm giá trị này để làm chậm animation
    //           mass: 13, // Tăng giá trị này để animation có vẻ nặng nề hơn
    //         });
    //         setTimeout(() => {
    //           setNextIndex(currentIndex + 1);
    //           setCurrentIndex(currentIndex + 1);
    //           activityStore.deletePersonFromList();
    //           activityStore.addOnePersonToList();
    //         }, 300);
    //       }}>
    //       <View style={[styles.button]}>
    //         <FontAwesome
    //           name="close"
    //           style={{fontWeight: 'bold', fontSize: 30, color: '#F76C6B'}}
    //         />
    //       </View>
    //     </Pressable>
    //     <View style={styles.button}>
    //       <FontAwesome
    //         name="star"
    //         style={{fontWeight: 'bold', fontSize: 24, color: '#3AB4CC'}}
    //       />
    //     </View>
    //     <Pressable
    //       onPress={() => {
    //         translateX.value = withSpring(hiddenTranslateX, {
    //           damping: 900, // Tăng giá trị này để giảm tốc độ
    //           stiffness: 900, // Giảm giá trị này để làm chậm animation
    //           mass: 13, // Tăng giá trị này để animation có vẻ nặng nề hơn
    //         });
    //         setTimeout(() => {
    //           setNextIndex(currentIndex + 1);
    //           setCurrentIndex(currentIndex + 1);
    //           activityStore.deletePersonFromList();
    //           activityStore.addOnePersonToList();
    //         }, 300);
    //       }}>
    //       <View style={styles.button}>
    //         <FontAwesome
    //           name="heart"
    //           style={{fontWeight: 'bold', fontSize: 30, color: '#4FCC94'}}
    //         />
    //       </View>
    //     </Pressable>
    //     <View style={styles.button}>
    //       <Ionicons
    //         name="flash"
    //         style={{fontWeight: 'bold', fontSize: 30, color: '#A65CD2'}}
    //       />
    //     </View>
    //   </View>
    //   <MatchScreen
    //     open={openMatchScreen}
    //     handlePressMessage={handlePressMessage}
    //     handlePressHome={handlePressHome}
    //     data={activityStore.listProfile[currentIndex]}
    //   />
    // </View>

    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <Swiper
          ref={swiperRef}
          cards={activityStore.listProfile}
          renderCard={card => <CardProfile user={card} />}
          onSwiped={() => setSwiping(false)}
          onSwipedLeft={cardIndex => {
            swipeLeft(activityStore.listProfile[cardIndex]);
          }}
          onSwipedRight={cardIndex => {
            swipeRight(activityStore.listProfile[cardIndex]);
          }}
          backgroundColor={'#ededed'}
          cardVerticalMargin={50}
          stackSize={2} // Số card hiển thị phía sau
          horizontalThreshold={100}
          verticalThreshold={3000}
          stackScale={20}
          swipeAnimationDuration={700}
          animateCardOpacity
          animateOverlayLabelsOpacity={true}
          overlayLabels={{
            left: {
              element: (
                <Image
                  source={require('../../assets/images/nope.png')}
                  style={styles.nopePic}
                />
              ) /* Optional */,
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                  zIndex: 4,
                },
              },
            },
            right: {
              element: (
                <Image
                  source={require('../../assets/images/LIKE.png')}
                  style={styles.likePic}
                />
              ) /* Optional */,
              title: 'LIKE',
              style: {
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 40,
                  zIndex: 4,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.bottomNavigation}>
        <View style={[styles.button]}>
          <FontAwesome
            name="undo"
            style={{fontWeight: 'bold', fontSize: 30, color: '#FBD88D'}}
          />
        </View>
        <Pressable
          onPress={() => {
            if (!swiping) {
              setSwiping(true);
              swiperRef.current?.swipeLeft();
            }
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
            if (!swiping) {
              setSwiping(true);
              swiperRef.current?.swipeRight();
            }
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
      <MatchScreen
        open={openMatchScreen}
        handlePressMessage={handlePressMessage}
        handlePressHome={handlePressHome}
        data={dataInMatch}
      />
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
    width: 200,
    height: 200,
  },
  likePic: {
    width: 150,
    height: 150,
    // position: 'absolute',
    // zIndex: 4,
    // top: 130,
    // left: 40,
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
