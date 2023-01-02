import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';

import Profile from '../screens/app/Profile';
import Dashboard from '../screens/app/Dashboard';

import { tabBarStyle } from '../assets/style';
import Users from '../screens/app/Users';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const isAuth = useSelector(state => state.user.jwt !== null);
    const routeIcons = {
        'Profile': 'user-cog',
        'Dashboard': 'cogs',
        'Users': 'users'
    }

    return (
        <Tab.Navigator initialRouteName="Dashboard" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                return <FontAwesome5Icon name={routeIcons[route.name]} size={25} color={color} />
            },
            tabBarStyle
        })}
            tabBarOptions={{
                activeTintColor: '#eee',
                inactiveTintColor: '#999',
                showLabel: false
            }}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={(props) => Header(props)} />
            {isAuth ? <Tab.Screen name="Profile" component={Profile} options={(props) => Header(props)} /> : null}
            <Tab.Screen name="Users" component={Users} options={(props) => Header(props)} />
        </Tab.Navigator>
    );
}
