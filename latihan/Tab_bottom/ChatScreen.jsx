// ChatScreen.jsx




import React, { useState, useEffect, useRef } from 'react';
import {ScrollView, Modal,StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, TouchableWithoutFeedback, Clipboard } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function ChatScreen({ route }) {
  const { contactName,contactUsername,contactImg } = route.params;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null); // Reference to FlatList
 const [isModalVisible, setIsModalVisible] = useState(false); // State untuk 
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

    const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    
   
    <View style={styles.container}>
     
         <View style={{backgroundColor :'white', padding : 13,flexDirection : 'row', alignItems :'center'}}>
     
      <TouchableOpacity style ={{flexDirection :'row'}} onPress={handlePress}>
         <Image
          source={{uri :contactImg}} // Ganti dengan URL gambar profil Kalian
          style={{width : 40, height : 40, borderRadius : 50}}
          />
          <View style={{marginLeft:10}}>
      <Text style={{fontSize : 20, fontWeight :'bold'}}>{contactName}</Text>
      <Text style={{color : 'gray'}}>{contactUsername}</Text>
          </View>
          </TouchableOpacity>
     

      <View style={{flexDirection:'row', alignItems:'center',marginLeft : 100}}>
      <TouchableOpacity style={{marginRight:20}}>
         <Image
          source={require('../Src/kamera.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30}}
          />
      </TouchableOpacity>
      <TouchableOpacity>
         <Image
          source={require('../Src/hp.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
          />
      </TouchableOpacity>
      <TouchableOpacity>
         <Image
          source={require('../Src/menu.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20,marginLeft :10}}
          />
      </TouchableOpacity>
     </View>
     </View>
     <View style={styles.containerChat}>
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





   <Modal visible={modalVisible} animationType="slide" style={{backgroundColor : 'white'}}>
         <TouchableOpacity onPress={closeModal}>
          <View style={{flexDirection :'row', padding : 10}}>
         <Image
          source={require('../Src/kembali.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20, marginTop : 3}}
        />

          <Text style={{ marginLeft : 10, fontSize : 20}} >Kembali</Text>
          </View>
        </TouchableOpacity>

       <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={{flexDirection : 'row'}}>

        <Image
          source={{uri : contactImg}} // Ganti dengan URL gambar profil Kalian
          style={styles.profileImage}
          />
         
          <View style={{justifyContent :'space-around'}}>

           <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.infoValue}>120</Text>
          <Text style={styles.infoTitle}>Postingan</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoValue}>300</Text>
          <Text style={styles.infoTitle}>Pengikut</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoValue}>150</Text>
          <Text style={styles.infoTitle}>Mengikuti</Text>
        </View>
      </View>
      </View>


          </View>
         
        <Text style={styles.name}>{contactName}</Text>
        <Text style={{marginLeft:10,color :'gray'}}>{contactUsername}</Text>
        <Text style={{marginLeft:10}}>Hobi makan di restoran mevvah😁😁</Text>
       
      
      </View>
        <View style={{backgroundColor : 'white'}}>
      

      <View style={{flexDirection : 'row',backgroundColor : 'white', marginLeft : 15, marginRight : 15, justifyContent : 'space-around'}}>
         <Image
          source={require('../Src/tsel_promo.jpeg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('../Src/shope_promo.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('../learn-component/Image/1109233.jpg')}// Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
      </View>
       <View style={{flexDirection : 'row', marginLeft : 15, backgroundColor : 'white',marginRight : 15, justifyContent : 'space-around'}}>
         <Image
          source={require('../learn-component/Image/frieren.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('../learn-component/Image/ganyu.jpeg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('../learn-component/Image/fern.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
      </View>
       
      

    </View>
     



      
     
    </ScrollView>
  
      
    
      </Modal>


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
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 0,
  },
  containerChat: {
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



   container: {
    flex: 1,
    backgroundColor: 'white',

  },
   galeri: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth : 5,
    borderColor : '#fff'

  },
  headerContainer: {
    padding : 10,
    backgroundColor :'#fff',
    borderBottomWidth : 1,
    borderColor : '#dedede'
  

  },
  profileImage: {
    marginTop : -20,
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth : 10,

    borderColor : '#fff'

  },
  tombol :{
    backgroundColor : '#dedede',
    width : 150,
    height : 30,
    // marginLeft : 20,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 10,
  },
  tombolakun :{
    backgroundColor : '#dedede',
    width : 50,
    height : 30,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 10,
  },
    
  name: {
    marginLeft : 10,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop : 10,
  },
  bio: {
    marginTop :5,
    fontSize: 16,
    color: '#333',
  },
  infoContainer: {
    marginLeft : 15,
    justifyContent : 'space-around',
    flexDirection : 'row',
    paddingVertical: 10,
    backgroundColor : '#fff',


  },
  infoSection: {

    alignItems: 'center',
  },
  infoTitle: {
    marginLeft : 20,
    color : 'gray',
    fontSize: 16,
   
  },
  infoValue: {
     fontWeight: 'bold',
    fontSize: 18,
    marginLeft : 20,
    

  },
});
