import { SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRecoilState } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '../../components/global';
import { userState } from '../../states';

const HomeScreen = () => {
    const [user, setUser] = useRecoilState(userState);

    const logout = () => {
        AsyncStorage.removeItem('accessToken');
        setUser(null);
    };

    return (
        <SafeAreaView className="flex-1">
            <StatusBar
                translucent={false}
                style="dark"
                backgroundColor="transparent"
            />

            <ScrollView className="p-5">
                <Text className="font-medium text-xl">
                    👋 Halo, {user.nickname}
                </Text>
                <TouchableOpacity
                    onPress={logout}
                    className="mt-5 bg-red-400/40 border-2 border-red-400 rounded-xl py-2 w-24"
                >
                    <Text className="text-center text-red-600 font-semibold">
                        Keluar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
