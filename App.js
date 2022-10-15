import { NavigationContainer } from '@react-navigation/native';

import * as Stacks from './stacks';

const App = () => {
    return (
        <NavigationContainer theme={{ colors: { background: 'transparent' } }}>
            <Stacks.AuthStack />
        </NavigationContainer>
    );
};

export default App;
