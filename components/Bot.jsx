import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { sendMessage } from "../api/botApi";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import MyTextInput from "./MyTextInput";

export default function Bot({ setScreenType, screenTypes, QRData }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      message:
        "Здравствуйте! Я бот, который может попытаться ответить на вопросы об объекте, который вы отсканировали",
    },
  ]);
  const scrollViewRef = useRef(null);

  const [message, setMessage] = useState("");

  const handleBackButtonPress = () => {
    setScreenType(screenTypes.Info);
  };

  const onPress = async () => {
    const tempMessage = message.trim();
    setMessage("");
    const messageId = Date.now();
    const updatedMessages = [
      ...messages,
      { message: tempMessage, error: false, loading: true, id: messageId },
    ];
    setMessages(updatedMessages);
    scrollViewRef.current.scrollToEnd({ animated: true });
    try {
      const botMessage = await sendMessage(tempMessage, QRData);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: botMessage.data,
          from: "bot",
          replyTo: messageId,
        },
      ]);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id !== undefined && msg.id === messageId
            ? { ...msg, loading: false }
            : msg
        )
      );
      scrollViewRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id !== undefined && msg.id === messageId
            ? { ...msg, error: true, loading: false }
            : msg
        )
      );
    }
  };

  const getMessageById = (id) => {
    let result = null;
    messages.forEach((msg) => {
      if (msg.id && msg.id === id) {
        result = msg.message;
      }
    });
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackButtonPress}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
        <Text>Бот</Text>
        <Text>{"        "}</Text>
      </View>
      <ScrollView style={styles.messageContainer} ref={scrollViewRef}>
        {messages.map((mess, i) => {
          return mess.from ? (
            <BotMessage
              key={i}
              message={mess.message}
              reply={getMessageById(mess.replyTo)}
            />
          ) : (
            <UserMessage
              key={i}
              isError={mess.error}
              isLoading={mess.loading}
              message={mess.message}
            />
          );
        })}
      </ScrollView>

      <MyTextInput
        message={message}
        setMessage={setMessage}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  messageContainer: {
    flex: 1,
    padding: 16,
  },
  topbar: {
    backgroundColor: "#55FF99",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: 16,
    color: "#3366FF",
  },
});
