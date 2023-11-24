import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
export default function QR({ setScreenType, screenTypes, setQRData }) {
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
