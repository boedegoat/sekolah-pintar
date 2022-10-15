import { NavigationContainer } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { authState } from '../states';

const NavContainer = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuthInStorage = async () => {
            setLoading(true);
            const authFromStorage = await AsyncStorage.getItem('auth');
            if (authFromStorage) {
                setAuth(JSON.parse(authFromStorage));
            }
            setLoading(false);
        };

        checkAuthInStorage();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <NavigationContainer theme={{ colors: { background: 'transparent' } }}>
            {auth.user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default NavContainer;
