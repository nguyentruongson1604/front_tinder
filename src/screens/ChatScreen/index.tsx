/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Image} from 'react-native-svg';
import {
  useMessageStore,
  useProfileStore,
  useSocket,
  useUserStore,
} from '../../store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface IMessage {
  sender: string;
  recipient: string;
  content: string;
  createAt: Date;
}

export const ChatScreen = observer(() => {
  const route = useRoute();
  const {item} = route.params;
  const socket = useSocket();
  const messageStore = useMessageStore();
  const profileStore = useProfileStore();
  const userStore = useUserStore();
  const scrollViewRef = useRef<ScrollView>(null);
  console.log('item in herer', userStore.userAccess);

  useEffect(() => {
    messageStore.recipient = item.user;
    messageStore.getInitMessage();
  }, []);

  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    const res = await messageStore.createMessage(inputText, item.user || '');
    socket.emit('sendMessage', {
      _id: res._id,
      message: inputText,
      recipientId: item.user,
      sender: res.sender,
      createdAt: res.createdAt,
      name: userStore?.userAccess
        ? `${userStore?.userAccess.lastName} ${userStore?.userAccess.firstName}`
        : '',
    });
    setInputText('');
    scrollToBottom();
    const index = profileStore.listMatch.findIndex(
      match => match.user === item.user,
    );
    if (index !== -1) {
      const [removed] = profileStore.listMatch.splice(index, 1);
      profileStore.listMatch.unshift(removed);
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  useEffect(() => {
    socket.on('getMessage', res => {
      const newMessage = {
        _id: res._id,
        content: res.message,
        sender: res.sender,
        recipient: res.recipientId,
        createdAt: res.createdAt,
      };
      messageStore.addMessage(newMessage);
      scrollToBottom();
    });

    return () => {
      socket.off('getMessage');
    };
  }, [messageStore, socket]); //phải để socket trong useEffect vì khi re render. socket cũ sẽ ko mất đi mà sẽ tạo ra socket.on mới => sẽ bị tạo rất nhiều sự kiện socket.on

  useEffect(() => {
    if (messageStore.messages.length > 0) {
      scrollToBottom();
    }
  }, [messageStore.messages]);

  return (
    // <KeyboardAvoidingView
    //   style={{flex: 1}}
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
      {/* <KeyboardAwareScrollView
        style={{width: '100%'}}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"> */}
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollToBottom()}>
        {messageStore.messages.map((message, i) => (
          <View
            key={`${message._id}-${i}`}
            style={
              message.sender === userStore.userAccess?._id
                ? styles.myMessage
                : styles.theirMessage
            }>
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 104 : 0}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            value={inputText}
            onChangeText={text => setInputText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    // height: 500,
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
