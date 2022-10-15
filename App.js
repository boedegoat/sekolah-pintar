import { NavigationContainer } from '@react-navigation/native';

import * as Stacks from './stacks';

const App = () => {
    return (
        <NavigationContainer>
            <Stacks.AuthStack />
        </NavigationContainer>
    );
};

export default App;
