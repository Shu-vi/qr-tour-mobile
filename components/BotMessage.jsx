import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BotMessage({ message, reply }) {
  return (
    <View style={styles.botMessage}>
      {reply && (
        <View style={styles.reply}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {reply}
          </Text>
        </View>
      )}
      <Text style={styles.botMessageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  reply: {
    backgroundColor: "#b7b7b7",
    borderRadius: 5,
  },
});
