import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import buttonSendMessage from "../assets/buttonSendMessage.png";

export default function MyTextInput({ message, setMessage, onPress }) {
  const screenHeight = Dimensions.get("window").height;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { maxHeight: screenHeight * 0.3 }]}
        placeholder="Сообщение"
        placeholderTextColor="#B0B0B0"
        onChangeText={(text) => {
          setMessage(text);
        }}
        value={message}
        multiline
      />
      <TouchableOpacity
        onPress={onPress}
        disabled={message === ""}
        style={styles.sendButtonWrapper}
      >
        <Image source={buttonSendMessage} style={styles.sendButton} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginRight: 17,
    fontSize: 16,
  },
  sendButton: {
    width: 25,
    height: 25,
  },
  sendButtonWrapper: {
    position: "absolute",
    right: 5,
    bottom: 17,
  },
});
