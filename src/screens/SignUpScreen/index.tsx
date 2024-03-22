import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Background from '../../components/atoms/Background';
import Field from '../../components/atoms/Field';
import Btn from '../../components/atoms/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Signup = props => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: '100%'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 60,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          HiMatch
        </Text>
        <FontAwesome
          name="heart"
          style={{fontWeight: 'bold', fontSize: 22, color: 'white'}}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="First Name" />
          <Field placeholder="Last Name" />
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          {/* <Field placeholder="Contact Number" keyboardType={'number'} /> */}
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginTop: 35,
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: '#F63A6E', fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '78%',
              paddingRight: 16,
              marginBottom: 10,
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>and </Text>
            <Text style={{color: '#F63A6E', fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={'#F63A6E'}
            btnLabel="Signup"
            Press={() => {
              props.navigation.navigate('Login');
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'grey'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{
                  color: '#F63A6E',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
