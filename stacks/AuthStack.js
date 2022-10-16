import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Screens from '../screens/auth';

const Stack = createNativeStackNavigator();

const Auth = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Intro" component={Screens.IntroScreen} />
            <Stack.Screen name="Login" component={Screens.LoginScreen} />
            <Stack.Screen
                name="QRCodeScanner"
                component={Screens.QRCodeScannerScreen}
            />
        </Stack.Navigator>
    );
};

export default Auth;
