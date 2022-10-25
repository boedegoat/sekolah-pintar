import { ActivityIndicator, View } from 'react-native';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
} from 'react-native-heroicons/solid';
import colors from 'tailwindcss/colors';

import Text from './Text';

const Toast = ({ children, icon }) => {
    return (
        <View className="bg-white shadow-2xl shadow-black/50 py-4 px-5 rounded-2xl flex-row items-center space-x-2">
            {icon}
            <Text className="font-medium">{children}</Text>
        </View>
    );
};

export const LoadingToast = (toast) => (
    <Toast icon={<ActivityIndicator size="small" color="black" />}>
        {toast.message}
    </Toast>
);

export const SuccessToast = (toast) => (
    <Toast icon={<CheckCircleIcon size={20} color={colors.green[500]} />}>
        {toast.message}
    </Toast>
);

export const ErrorToast = (toast) => (
    <Toast icon={<ExclamationCircleIcon size={20} color={colors.red[500]} />}>
        {toast.message}
    </Toast>
);

export const CustomToast = (toast) => (
    <Toast icon={toast.icon}>{toast.message}</Toast>
);
