import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ToastProvider } from 'react-native-toast-notifications';

import * as Stacks from './stacks';
import * as Toast from './components/global';

const toastTypes = {
    loading: Toast.LoadingToast,
    success: Toast.SuccessToast,
    error: Toast.ErrorToast,
};

const App = () => {
    const [fontsLoaded] = useFonts({
        'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
        'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
        'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    });

    console.log({ fontsLoaded });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ToastProvider placement="top" offset={50} renderType={toastTypes}>
            <NavigationContainer
                theme={{ colors: { background: 'transparent' } }}
            >
                <Stacks.AuthStack />
            </NavigationContainer>
        </ToastProvider>
    );
};

export default App;
