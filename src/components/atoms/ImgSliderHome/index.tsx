/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Chip} from '../ChipPress';
import {useNavigation} from '@react-navigation/native';
import {hobbyInfos} from '../../../screens/InfoScreen';

// const width =
//   Dimensions.get('window').width - (Dimensions.get('window').width * 20) / 100;

// const images = [
//   'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
//   'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
//   'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
//   'https://media.istockphoto.com/id/1227618770/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-avatar-%E0%B9%83%E0%B8%9A%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%99%E0%B8%B8%E0%B8%A9%E0%B8%A2%E0%B9%8C-%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A1-%E0%B8%8A%E0%B8%B2%E0%B8%A2-%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B9%80%E0%B8%A7%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C.jpg?s=612x612&w=0&k=20&c=-9MtAurgUyGbb8n4XuuGgz1MKAXqtbTzK1t42dzjxWQ=',
//   'https://media.istockphoto.com/id/1227618770/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-avatar-%E0%B9%83%E0%B8%9A%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%99%E0%B8%B8%E0%B8%A9%E0%B8%A2%E0%B9%8C-%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A1-%E0%B8%8A%E0%B8%B2%E0%B8%A2-%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B9%80%E0%B8%A7%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C.jpg?s=612x612&w=0&k=20&c=-9MtAurgUyGbb8n4XuuGgz1MKAXqtbTzK1t42dzjxWQ=',
// ];

const ImgSliderHome = ({user}) => {
  //mo dong duoi de dung anh that
  const images = user?.photos?.imageProfileUrl || [];

  const navigation = useNavigation();
  const width =
    Dimensions.get('window').width -
    (Dimensions.get('window').width * 20) / 100;
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(0);
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
    // scrollViewRef.current = 0;
  }, [user]);

  const goToNextSlide = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < images.length) {
      scrollViewRef.current.scrollTo({x: width * newIndex, animated: true});
      setCurrentIndex(newIndex);
    }
  };

  const goToPreviousSlide = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      scrollViewRef.current.scrollTo({x: width * newIndex, animated: true});
      setCurrentIndex(newIndex);
    }
  };
  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
  };
  return (
    <View style={[styles.container, {width}]} onLayout={onLayout}>
      <View style={styles.indicatorContainer}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
              {width: width / images.length - 8},
            ]}
          />
        ))}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{borderRadius: 10}}
        onMomentumScrollEnd={e => {
          const xOffset = e.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(xOffset / width));
        }}>
        {images.map((image, index) => (
          <>
            <Image source={{uri: image}} style={[styles.image, {width}]} />

            {index == 0 ? (
              <View
                style={{
                  flex: 1,
                  zIndex: 2,
                  // backgroundColor: 'red',
                  position: 'absolute',
                  bottom: 0,
                  padding: 10,
                  left: index * width,
                  width,
                }}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 30,
                      marginRight: 8,
                    }}>
                    {user?.user?.lastName} {user?.user?.firstName}
                  </Text>
                  <Text style={{color: 'white', fontSize: 30}}>21</Text>
                </View>
                <Text style={{color: 'white', fontSize: 18, lineHeight: 24}}>
                  {user?.description}
                </Text>
              </View>
            ) : (
              <></>
            )}

            {index == 1 ? (
              <View
                style={{
                  flex: 1,
                  zIndex: 2,
                  // backgroundColor: 'red',
                  position: 'absolute',
                  bottom: 0,
                  padding: 10,
                  left: index * width,
                  width,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 20,
                  }}>
                  <Ionicons
                    name="location-sharp"
                    style={{color: 'white', fontSize: 22}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      marginLeft: 5,
                      marginBottom: 10,
                    }}>
                    Sống tại: {user?.adress}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    lineHeight: 24,
                    marginLeft: 7,
                  }}>
                  Cách xa {Math.ceil(user?.distance / 1000)} km
                </Text>
              </View>
            ) : (
              <></>
            )}

            {index == 2 ? (
              <View
                style={{
                  flex: 1,
                  zIndex: 2,
                  position: 'absolute',
                  bottom: 0,
                  padding: 10,
                  left: index * width,
                  width,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingRight: 10,
                  }}>
                  {user?.hobby?.map(hobby => {
                    if (!hobbyInfos[hobby?.type]) {
                      return <Chip content={hobby?.name} />;
                    } else {
                      return null;
                    }
                  })}
                </View>
              </View>
            ) : (
              <></>
            )}
          </>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToPreviousSlide} style={styles.button} />
        <TouchableOpacity onPress={goToNextSlide} style={styles.button} />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('Info', {user});
        }}
        style={{
          position: 'absolute',
          bottom: 130,
          right: 10,
          borderRadius: 20,
          backgroundColor: '#0000008b',
        }}>
        <FontAwesome6
          name="circle-up"
          style={{
            color: 'white',
            fontSize: 40,
          }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: '100%', // Điều chỉnh chiều cao nếu cần
  },
  image: {
    // width: Dimensions.get('window').width,
    height: '100%', // Phải giống với chiều cao container
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  button: {
    padding: 10,
    width: '50%',
  },
  indicatorContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
    zIndex: 2,
  },
  indicator: {
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: '#F63A6E',
  },
});

export default ImgSliderHome;
