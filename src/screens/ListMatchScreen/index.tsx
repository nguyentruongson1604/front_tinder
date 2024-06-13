/* eslint-disable react-native/no-inline-styles */
import {Observer, observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import {useProfileStore, useSocket} from '../../store';
import {useNavigation} from '@react-navigation/native';
import {IListMatch} from '../../store/domain/ProfileStore';

const renderChannelItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.channelItem}
    onPress={() => navigation.navigate('MessageChat', {item})}>
    <View style={{width: '100%', flexDirection: 'row'}}>
      <Image
        source={{uri: item.photos?.imageProfileUrl[0]}}
        style={styles.channelImage}
      />
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text style={styles.channelName}>
          {item.lastName} {item.firstName}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const ChannelListScreen = observer(() => {
  const profileStore = useProfileStore();
  const navigation = useNavigation();
  // const socket = useSocket();
  // useEffect(() => {
  //   socket.on('getNewMatch', res => {
  //     const newMatchProfile: IListMatch = res;
  //     profileStore.listMatch = [newMatchProfile, ...profileStore.listMatch];
  //   });
  //   return () => {
  //     socket.off('getNewMatch');
  //   };
  // }, [profileStore, socket]);
  return (
    <SafeAreaView style={styles.root}>
      <View style={{marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#F63A6E'}}>
          New Matches
        </Text>
        <ScrollView horizontal={true}>
          {profileStore.listMatchWithoutArrange.map(item => {
            return (
              <Pressable
                style={styles.user}
                onPress={async () => {
                  const user = await profileStore.getOtherProfile({
                    user: item.user,
                  });
                  navigation.navigate('Info', {user});
                }}>
                <Image
                  source={{
                    uri: item?.photos?.imageProfileUrl[0] || '',
                  }}
                  style={styles.image}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: '#F63A6E',
          marginLeft: 10,
          marginTop: 30,
          marginBottom: 10,
        }}>
        Message
      </Text>
      <Observer>
        {() => {
          return (
            <View style={styles.container}>
              <FlatList
                data={profileStore.listMatch}
                keyExtractor={item => item.user.toString()}
                renderItem={({item}) => {
                  return (
                    <Observer>
                      {() => renderChannelItem({item, navigation})}
                    </Observer>
                    // renderChannelItem({item, navigation})
                  );
                }}
              />
            </View>
          );
        }}
      </Observer>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  channelImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  channelName: {
    fontSize: 18,
  },

  user: {
    width: 100,
    height: 100,
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 50,

    borderWidth: 2,
    padding: 3,
    borderColor: '#F63A6E',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
