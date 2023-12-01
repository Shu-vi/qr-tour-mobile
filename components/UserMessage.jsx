import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserMessage({ message, isError, isLoading }) {
  return (
    <View
      style={[
        styles.userMessage,
        isError ? styles.errorContainer : null,
        isLoading ? styles.opacity70 : null,
      ]}
    >
      {isError && (
        <View style={styles.errorIconContainer}>
          <Text style={styles.errorIcon}>!</Text>
        </View>
      )}
      <Text style={styles.userMessageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
