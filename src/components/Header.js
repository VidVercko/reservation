
import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../assets/style';

export default function headerWithIcon({ navigation }) {
    return {
        headerTitle: props => <Text {...props} />,
        headerStyle: {
            backgroundColor: colors.dark,
            height: 40
        },
        headerTitleStyle: {
            color: colors.plain,
            fontWeight: 'bold',
            fontSize: 20
        },
        headerRight: () => (
            <Ionicons
                name={'home'} size={25} color={colors.plain} style={{ marginHorizontal: 15 }}
                onPress={() => navigation.getParent()?.navigate('HomePage')}
            />
        ),
    }
}