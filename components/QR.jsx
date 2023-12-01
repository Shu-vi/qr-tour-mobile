import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
export default function QR({
  setScreenType,
  screenTypes,
  setQRData,
  ip,
  setIp,
}) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ _, data }) => {
    setQRData(data);
    setScreenType(screenTypes.Info);
  };

  if (hasPermission === false) {
    return (
      <Text style={styles.error}>
        Для использования приложения требуется доступ к камере устройства.
        Предоставьте доступ в настройках смартфона
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#B0B0B0"
        placeholder="127.0.0.1"
        value={ip}
        onChangeText={(text) => {
          setIp(text);
        }}
      />
      <View style={styles.wrapper}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(20, 20, 20)",
  },
  absoluteFillObject: {
    flex: 1,
  },
  wrapper: {
    alignSelf: "center",
    height: "100%",
    width: "100%",
  },
  error: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
});
