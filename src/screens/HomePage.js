import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from "../actions/user";

import { colors } from "../assets/style";
const image = require('../assets/landing.jpg');


export default function HomePage({ navigation }) {
    const dispatch = useDispatch();
    const textStyle = { color: colors.dark, fontSize: 16, fontWeight: 'bold' };
    const isAuth = useSelector(state => state.user.jwt !== null);

    function handleLogout() {
        dispatch(userLogout());
    }

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
                    onPress={() => navigation.navigate('App')}
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

    function UserActions() {
        return (
            <>
                <Button
                    title={"Browse"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.primary,
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%' }}
                    titleStyle={textStyle}
                    onPress={() => navigation.navigate('App')}
                />
                <Button
                    title={"Log out"}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: colors.primary,
                        borderWidth: 2,
                        marginTop: 15,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%' }}
                    titleStyle={textStyle}
                    onPress={handleLogout}
                />
            </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', margin: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
                    Reservations app
                </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20 }}>
                {isAuth ? <UserActions /> : <Actions />}
            </View>

            </ImageBackground>
        </View>
    );
}