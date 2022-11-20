import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import { tabBarStyle } from '../assets/style';

const Tab = createBottomTabNavigator();

export default function AuthNavigator() {
    const routeIcons = {
        'Login': 'key',
        'Register': 'person-add',
    }

    return (
        <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={routeIcons[route.name]} size={25} color={color} />
            },
            tabBarStyle
        })}
            tabBarOptions={{
                activeTintColor: '#eee',
                inactiveTintColor: '#999',
                showLabel: false
            }}

        >
            <Tab.Screen name="Login" component={Login} options={(props) => Header(props)} />
            <Tab.Screen name="Register" component={Register} options={(props) => Header(props)} />
        </Tab.Navigator>
    );
}
