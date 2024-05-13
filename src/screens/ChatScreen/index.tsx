/* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import FontistoIcon from 'react-native-vector-icons/Fontisto';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const ChatScreen = () => {
//   return (
//     <SafeAreaView style={styles.root}>
//       <View style={styles.container}>
//         <Text style={{fontWeight: 'bold', fontSize: 24, color: '#F63A6E'}}>
//           New Matches
//         </Text>
//         <View style={styles.users}>
//           <View style={styles.user}>
//             <Image
//               source={{
//                 uri: 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.user}>
//             <Image
//               source={{
//                 uri: 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.user}>
//             <Image
//               source={{
//                 uri: 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/master/pass/Face%20taping%20.jpg',
//               }}
//               style={styles.image}
//             />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     width: '100%',
//     flex: 1,
//     padding: 10,
//   },
//   container: {
//     padding: 10,
//   },
//   users: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   user: {
//     width: 100,
//     height: 100,
//     margin: 10,
//     borderRadius: 50,

//     borderWidth: 2,
//     padding: 3,
//     borderColor: '#F63A6E',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 50,
//   },
// });

// // https://www.youtube.com/watch?v=sB5Wa7-RD3A
// export default ChatScreen;

import {useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Image} from 'react-native-svg';
import {useMessageStore, useSocket} from '../../store';

export const ChatScreen = observer(() => {
  const route = useRoute();
  const {item} = route.params;
  const socket = useSocket();
  const mes = useMessageStore();
  useEffect(() => {
    mes.recipient = item.user;
    mes.getInitMessage();
  }, []);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {id: messages.length, text: inputText, sender: 'Me'};
    setMessages([...messages, newMessage]);
    socket.emit('sendMessage', {message: inputText, recipientId: item.user});
    setInputText('');
  };

  socket.on('getMessage', res => {
    console.log('resin', res);

    const newMessage = {
      id: messages.length,
      text: res.message,
      sender: 'Other',
    };
    setMessages([...messages, newMessage]);
  });

  console.log('mess', messages);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          borderBottomColor: '#38373744',
          borderBottomWidth: 0.5,
        }}>
        <Image
          source={{uri: item.photos?.imageProfileUrl[0]}}
          style={{width: 20, height: 20, borderRadius: 10}}
        />
        <Text>{item.firstName}</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map(message => (
          <View
            key={message.id}
            style={
              message.sender === 'Me' ? styles.myMessage : styles.theirMessage
            }>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={text => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
