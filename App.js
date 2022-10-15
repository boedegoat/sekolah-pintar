import { useFonts } from 'expo-font';
import { ToastProvider } from 'react-native-toast-notifications';
import { RecoilRoot } from 'recoil';

import * as Toast from './components/global';
import NavContainer from './stacks/NavContainer';

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
        <RecoilRoot>
            <ToastProvider placement="top" offset={50} renderType={toastTypes}>
                <NavContainer />
            </ToastProvider>
        </RecoilRoot>
    );
};

export default App;
