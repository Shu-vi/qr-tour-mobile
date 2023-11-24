import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { sendMessage } from "../api/botApi";

export default function ChatComponent({ setScreenType, screenTypes, QRData }) {
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
    const tempMessage = message;
    setMessage("");
    const id = Date.now();
    const updatedMessages = [
      ...messages,
      { message: tempMessage, error: false, loading: true, id },
    ];
    setMessages(updatedMessages);
    scrollViewRef.current.scrollToEnd({ animated: true });
    try {
      const botMessage = await sendMessage(tempMessage, QRData);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: botMessage.data, from: "bot" },
      ]);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id !== undefined && msg.id === id
            ? { ...msg, loading: false }
            : msg
        )
      );
      scrollViewRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id !== undefined && msg.id === id
            ? { ...msg, error: true, loading: false }
            : msg
        )
      );
    }
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
          return (
            <View
              key={i}
              style={[
                mess.from ? styles.botMessage : styles.userMessage,
                mess.error ? styles.errorContainer : null,
                mess.loading ? styles.opacity70 : null,
              ]}
            >
              {mess.error && (
                <View style={styles.errorIconContainer}>
                  <Text style={styles.errorIcon}>!</Text>
                </View>
              )}
              <Text
                style={
                  mess.from ? styles.botMessageText : styles.userMessageText
                }
              >
                {mess.message}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите ваше сообщение..."
          placeholderTextColor="#B0B0B0"
          onChangeText={(text) => {
            setMessage(text);
          }}
          value={message}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={onPress}
          disabled={message === ""}
        >
          <Text style={styles.sendButtonText}>Отправить</Text>
        </TouchableOpacity>
      </View>
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
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
    padding: 12,
  },
  botMessageText: {
    fontSize: 16,
    color: "#000",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#3366FF",
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
    padding: 12,
  },
  userMessageText: {
    fontSize: 16,
    color: "#FFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#3366FF",
    borderRadius: 8,
    padding: 12,
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 16,
    marginLeft: 16,
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
  topbarText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  backButton: {
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#3366FF",
  },
  errorContainer: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    backgroundColor: "#FFCCCC",
  },
  errorIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    padding: 4,
    borderRadius: 4,
  },
  errorIcon: {
    color: "white",
    fontWeight: "bold",
  },
  opacity70: {
    opacity: 0.7,
  },
});
