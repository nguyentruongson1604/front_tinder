/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import {Modal, Pressable, View} from 'react-native';

export const ModalCustom = ({open, handlePress}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: '#dbdbdb',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <View style={{paddingVertical: 15}}>
            <Text style={{color: '#5f5f5f', fontSize: 14, fontWeight: 'bold'}}>
              Hãy chọn giới tính của bạn
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => handlePress('Male')}
              style={{
                paddingVertical: 20,
                borderTopWidth: 0.5,
                borderTopColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#575fa5',
                  fontSize: 20,
                }}>
                Nam
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress('Female')}
              style={{
                paddingVertical: 20,
                borderTopWidth: 0.5,
                borderTopColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#575fa5',
                  fontSize: 20,
                }}>
                Nữ
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress('Other')}
              style={{
                paddingVertical: 20,
                borderTopWidth: 0.5,
                borderTopColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#575fa5',
                  fontSize: 20,
                }}>
                Khác
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
