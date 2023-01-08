import Toast from 'react-native-simple-toast';

export const showMsg = (msg) => {
    Toast.show(msg, Toast.SHORT);
}
