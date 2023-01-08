import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ImageBackground } from 'react-native';
import { colors } from '../../assets/style';
import { Input, Button } from 'react-native-elements';
import { userLogin, userLogout } from '../../actions/user';
import AuthWrapper from '../../components/AuthWrapper';
import image from "../../assets/landing1.jpg"
import { isProfileLoaded } from '../../store/user';


export default ({ navigation }) => {
    const isAuth = useSelector((state) => !!state.user.accessToken);
    const isProfile = useSelector(isProfileLoaded);
    const loading = useSelector(state => state.user?.loading ?? false);

    const dispatch = useDispatch();

    function handleLogin() {
        const user = {
          username: username,
          password: password,
        };
        dispatch(userLogin(user));
      }
    
    //const [username, setUsername] = useState("mobilni_test");
    //const [password, setPassword] = useState("Mycfyt-nehben-6vypmo");

    const [username, setUsername] = useState("janezs");
    const [password, setPassword] = useState("geslo123");

    useEffect(() => {
        dispatch(userLogout());
    }, [dispatch]);

    useEffect(() => {
        if (isAuth && isProfile) {
            navigation.getParent()?.navigate('App');
        }
      }, [isAuth, isProfile]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground source={image} style={ {width: "100%", height: "100%"}}>
            <AuthWrapper>
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'ion-icons', name: 'mail', color: colors.dark }}
                    onChangeText={setUsername}
                    inputStyle={{'color': colors.dark}}
                    value={username}
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
                    loading={loading}
                />
            </AuthWrapper>
            </ImageBackground>
        </View>    
        )
}