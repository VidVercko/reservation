import React from "react";
import { Image , Text, View, StyleSheet } from "react-native";
import Logo from '../assets/LogoVertical.png';

export default function ({ children }) {
  return (
    <View className="auth-wrapper">
      <View className="center banner">
        <Image source={Logo} style={{ alignSelf: 'center'}}/>
        <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
          </Text>
          <Text>© Janez, Brina, Luka, Vid, Miha (2022)</Text>
      </View>
        <View className="center form-container">{children}</View>
    </View>
  );
}
