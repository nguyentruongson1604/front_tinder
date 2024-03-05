import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Btn from '../../components/atoms/Button';

const Welcome = () => {
  return (
    <LinearGradient style={{flex: 1}} colors={['#dc8ba2', '#F63A6E']}>
      <View style={{flex: 1}}>
        <View>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1227618770/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-avatar-%E0%B9%83%E0%B8%9A%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%99%E0%B8%B8%E0%B8%A9%E0%B8%A2%E0%B9%8C-%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A1-%E0%B8%8A%E0%B8%B2%E0%B8%A2-%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B9%80%E0%B8%A7%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C.jpg?s=612x612&w=0&k=20&c=-9MtAurgUyGbb8n4XuuGgz1MKAXqtbTzK1t42dzjxWQ=',
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 10,
              transform: [
                {translateX: 20},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />

          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1227618760/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-avatar-%E0%B9%83%E0%B8%9A%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%99%E0%B8%B8%E0%B8%A9%E0%B8%A2%E0%B9%8C-%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A1-%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87%E0%B8%A2%E0%B8%B8%E0%B9%82%E0%B8%A3%E0%B8%9B-%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B9%80%E0%B8%A7%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C.jpg?s=170667a&w=0&k=20&c=oXiiK9GXTI-eVqiAnK8eHmRyjKIkXLjnlHqDZNaDrFw=',
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: -30,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-5deg'},
              ],
            }}
          />

          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1227618809/es/vector/human-face-avatar-icon-perfil-para-la-red-social-mujer-ilustraci%C3%B3n-vectorial.jpg?s=170667a&w=0&k=20&c=sIfpw1x7qr6PcErcKYid9-4-QdHMDujR-st-1neM3vg=',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 130,
              left: -50,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '15deg'},
              ],
            }}
          />

          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1227618791/es/vector/human-face-avatar-icon-perfil-para-la-red-social-hombre-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=WUzOnINCmsNZjV-W8d4BwwCkTGneiQ_VwQFuptNvAkY=',
            }}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: 'absolute',
              top: 110,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: 'absolute',
            top: 400,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: '800',
              color: '#FFFFFF',
            }}>
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: '800',
              color: '#FFFFFF',
            }}>
            Started
          </Text>

          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF',
                marginVertical: 4,
              }}>
              Connect with each other with chatting
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF',
              }}>
              Calling, Enjoy Safe and private texting
            </Text>
          </View>

          <Btn
            textColor="white"
            bgColor={'#F63A6E'}
            btnLabel="Signup"
            Press={() => {}}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF',
              }}>
              Already have an account ?
            </Text>
            <Pressable onPress={() => {}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
