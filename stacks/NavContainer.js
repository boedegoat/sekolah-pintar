import { NavigationContainer } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { userState } from '../states';
import request from '../utils/request';

const NavContainer = () => {
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMe = async () => {
            setLoading(true);

            try {
                const { data: response } = await request.get('/users/me');
                setUser(response.data.user);
            } catch (error) {
                // silent error
            }

            setLoading(false);
        };

        getMe();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <NavigationContainer theme={{ colors: { background: 'transparent' } }}>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default NavContainer;
