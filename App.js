import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import * as Stacks from './stacks';

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
        <NavigationContainer theme={{ colors: { background: 'transparent' } }}>
            <Stacks.AuthStack />
        </NavigationContainer>
    );
};

export default App;
