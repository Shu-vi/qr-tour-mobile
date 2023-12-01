import React, { useState } from "react";
import QR from "../components/QR";
import Info from "../components/Info";
import Bot from "../components/Bot";
export default function QRScreen() {
  const screenTypes = {
    QR: 1,
    Info: 2,
    Bot: 3,
  };
  const [screenType, setScreenType] = useState(screenTypes.Bot);
  const [QRData, setQRData] = useState("");

  if (screenType === screenTypes.QR) {
    return (
      <QR
        setScreenType={setScreenType}
        screenTypes={screenTypes}
        setQRData={setQRData}
      />
    );
  } else if (screenType === screenTypes.Info) {
    return (
      <Info
        QRData={QRData}
        setScreenType={setScreenType}
        screenTypes={screenTypes}
      />
    );
  } else if (screenType === screenTypes.Bot) {
    return (
      <Bot
        setScreenType={setScreenType}
        screenTypes={screenTypes}
        QRData={QRData}
      />
    );
  }
}
