import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Image} from 'react-native';
import { colors } from '../../assets/style';
import { Input, Button } from 'react-native-elements';
import { userRegister, userLogout } from '../../actions/user';

export default ({ navigation }) => {
    const isLoading = useSelector(state => state.user.loading === true);
    const isAuth = useSelector(state => state.user.jwt !== null);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [fullname, setfullname] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister() {
        dispatch(userRegister({ email, fullname, password }));
    }

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
                placeholder='Full name'
                leftIcon={{ type: 'ion-icons', name: 'person', color: colors.dark }}
                onChangeText={setfullname}
                inputStyle={{'color': colors.dark}}
            />
            <Input
                placeholder='Email'
                leftIcon={{ type: 'ion-icons', name: 'mail', color: colors.dark }}
                onChangeText={setEmail}
                inputStyle={{'color': colors.dark}}
            />
            <Input
                placeholder='Password'
                secureTextEntry={true}
                leftIcon={{ type: 'ion-icons', name: 'lock', color: colors.dark }}
                onChangeText={setPassword}
                inputStyle={{'color': colors.dark}}
            />
            <Button
                title="Register"
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
                onPress={handleRegister}
                loading={isLoading}
            />
        </View>
    )
}