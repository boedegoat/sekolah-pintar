import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Screens from '../screens/app';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Screens.HomeScreen} />
            <Stack.Screen name="Schedule" component={Screens.ScheduleScreen} />
        </Stack.Navigator>
    );
};

export default AppStack;
