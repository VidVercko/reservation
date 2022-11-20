import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { Button } from 'react-native-elements';

import { colors } from "../assets/style";
const image = require('../assets/landing.jpg');


export default function HomePage({ navigation }) {
    const textStyle = { color: colors.dark, fontSize: 16, fontWeight: 'bold' };

    function Actions() {
        return (
            <>
                <Button
                    title={"Browse anonymously"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.dark,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%' }}
                    titleStyle={textStyle}
                    onPress={() => {
                        console.log("test")
                        navigation.navigate('Auth')
                    }}
                />
                <View style={{ height: 20 }} />
                <Button
                    title={"Login/Register"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.dark,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%' }}
                    titleStyle={textStyle}
                    onPress={() => navigation.navigate('Auth')}
                />
            </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
               
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20 }}>
                    <Actions />
                </View>

            </ImageBackground>
        </View>
    );
}