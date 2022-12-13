import toast from 'react-native-toast-message';

export const warning = (msg) => {
    toast.warn(msg);
}

export const success = (msg) => {
    toast.success(msg);
}

export const error = (msg) => {
    toast.error(msg);
}
