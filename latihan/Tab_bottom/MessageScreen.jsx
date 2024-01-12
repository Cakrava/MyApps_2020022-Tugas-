import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, TouchableWithoutFeedback, Clipboard } from 'react-native';
import axios from 'axios';

export default function MessageScreen() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null); // Reference to FlatList

  const addMessage = async () => {
    if (newMessage.trim() !== '') {
      const trimmedMessage = newMessage.trim();
      const newMessages = [...messages, { text: trimmedMessage, sender: 'me' }];

      setMessages(newMessages);
      setNewMessage('');
      setLoading(true);

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/text-davinci-002/completions',
          {
            prompt: trimmedMessage,
            max_tokens: 150,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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',
            },
          }
        );

        // Simulate a delay for the loader animation
        setTimeout(() => {
          const responseData = response.data.choices[0].text;
          const specialResponse = handleSpecialRequests(responseData);

          if (specialResponse) {
            newMessages.push({ text: specialResponse, sender: 'other' });
          } else {
            newMessages.push({ text: responseData, sender: 'other' });
          }

          setMessages(newMessages);
          setLoading(false);
          scrollToBottom(); // Scroll to the bottom after new message
        }, 1000); // Adjust the delay time as needed
      } catch (error) {
        console.error('Error sending message to ChatGPT API:', error);
        setLoading(false);
        // Handle error as needed
      }
    }
  };

  const handleLongPress = (text) => {
    Clipboard.setString(text);
    // You can show a pop-up here if needed
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom on initial render
  }, []);

  const handleSpecialRequests = (msg) => {
    const ladiesSearchRegex = /ladies/i;
    const greenSearchRegex = /green/i;

    if (ladiesSearchRegex.test(msg)) {
      console.log("Requested for: ladies")
      return "Kami akan segera mengantarkan rising ladies untukmu. Dan namun sebelumnya saya akan berbicara dengannya untuk membersihkan afiliasinya dengan milisi dan menyeimbangkan sisi ketidakberdayaannya.";
    }

    if (greenSearchRegex.test(msg)) {
      console.log("Requested for: green")
      // Handle green request here
    }

    // Add more special requests handling as needed

    // If no special request matches, return null
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback onLongPress={() => handleLongPress(item.text)}>
            <View style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}>
              <Text style={item.sender === 'me' ? styles.myMessageText : styles.otherMessageText}>{item.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="gray" />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity onPress={addMessage} style={{ backgroundColor: 'purple', padding: 15, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Image tintColor={'white'} source={require('../learn-component/Image/share.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#D9B4FF',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  myMessageText: {
    color: 'black', // Adjust the text color for "me" messages
  },
  otherMessageText: {
    color: 'black', // Adjust the text color for "other" messages
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  loaderContainer: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});
