import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getDescription } from "../api/botApi";

export default function Info({ QRData, setScreenType, screenTypes, ip }) {
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getDescription(QRData, ip)
      .then((data) => {
        if (data.status) {
          if (data.status == "1") {
            setIsError(true);
          }
        } else {
          setInfo(data.data);
        }
      })
      .catch((error) => alert(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLeftButtonPress = () => {
    setScreenType(screenTypes.QR);
  };

  const handleRightButtonPress = () => {
    setScreenType(screenTypes.Bot);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    Alert.alert("Ошибка", "Данный QR-код не поддерживается. Переадресация...", [
      {
        text: "OK",
        onPress: () => setScreenType(screenTypes.QR),
      },
    ]);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Ошибка при загрузке данных.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={handleLeftButtonPress}
        >
          <Text style={styles.textButton}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={handleRightButtonPress}
        >
          <Text style={styles.textButton}>Чат с ботом 🤖</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.text}>{info}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  leftButton: {
    backgroundColor: "#55FF99",
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 21,
    marginBottom: 20,
  },
  rightButton: {
    backgroundColor: "#55FF99",
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  textButton: {
    fontSize: 16,
    color: "#000",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
