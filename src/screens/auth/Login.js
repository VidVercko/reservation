import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import { colors } from '../../assets/style';
import { Input, Button } from 'react-native-elements';
import { userLogin, userLogout } from '../../actions/user';

export default ({ navigation }) => {
    const isLoading = useSelector(state => state.user.loading === true);
    const isAuth = useSelector(state => state.user.jwt !== null);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(userLogin({}));
        navigation.navigate('App');
    }

    const [email, setEmail] = useState("john.doe@gmail.com");
    const [password, setPassword] = useState("geslo123");

    useEffect(() => {
        dispatch(userLogout());
    }, [dispatch]);

    if (isAuth) {
        navigation.getParent()?.navigate('App');
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'ion-icons', name: 'mail', color: colors.dark }}
                onChangeText={setEmail}
                inputStyle={{'color': colors.dark}}
                value={email}
            />
            <Input
                placeholder='Password'
                secureTextEntry={true}
                leftIcon={{ type: 'ion-icons', name: 'lock', color: colors.dark }}
                onChangeText={setPassword}
                inputStyle={{'color': colors.dark}}
                value={password}
            />
            <Button
                title="Log in"
                buttonStyle={{
                    backgroundColor: colors.dark,
                    borderRadius: 10,
                    height: 45
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 18, color: colors.plain }}
                containerStyle={{
                    height: 50,
                    width: '95%',
                    marginVertical: 10,
                }}
                onPress={handleLogin}
                loading={isLoading}
            />
        </View>
    )
}