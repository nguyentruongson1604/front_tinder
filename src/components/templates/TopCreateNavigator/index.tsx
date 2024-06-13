/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react-lite';
import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'react-native';
import {useUserStore} from '../../../store';

export const TopCreateNavigator = observer(() => {
  const userStore = useUserStore();
  return (
    <View>
      <View style={styles.fixedHeader}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '5%',
            }}
          />
          <View style={{width: '90%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Tạo profile của mình
            </Text>
          </View>

          <Pressable
            style={{
              width: '5%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            onPress={() => {
              userStore.logout();
            }}>
            {/* <Text style={{fontWeight: '600'}}>Xong</Text> */}
          </Pressable>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  fixedHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  fixedHeaderText: {
    color: 'black',
    fontSize: 20,
  },
});
