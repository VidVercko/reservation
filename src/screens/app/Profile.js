import React, { useEffect, useState } from 'react'
import { Text, View , ImageBackground} from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../actions/user';
import image from "../../assets/landing1.jpg"
import { colors } from '../../assets/style';

export default function({ navigation }) {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(userLogout());
        navigation.navigate('Auth');
    }

    return (
        <View>
            <ImageBackground source={image} style={ {width: "100%", height: "100%"}}>
                <Text>
                    profile
                </Text>
                <Button buttonStyle={{
                        backgroundColor: colors.dark,
                        borderRadius: 10,
                        height: 45
                    }} title={"Logout"} onPress={handleLogout} />
            </ImageBackground>
        </View>
    )
}