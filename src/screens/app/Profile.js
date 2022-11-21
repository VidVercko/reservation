import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../actions/user';

export default function({ navigation }) {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(userLogout());
        navigation.navigate('Auth');
    }

    return (
        <View>
            <Button title={"Logout"} onPress={handleLogout} />
            <Text>
                profile
            </Text>
        </View>
    )
}