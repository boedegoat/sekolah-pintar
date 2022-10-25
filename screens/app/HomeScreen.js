import {
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    View,
    Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import {
    ArrowLeftOnRectangleIcon,
    ClockIcon,
    Squares2X2Icon,
} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'react-native-gesture-bottom-sheet';

import colors from 'tailwindcss/colors';
import { Text } from '../../components/global';
import { customTimeState, userState } from '../../states';
import {
    ScheduleOverview,
    QuickButtons,
    CustomTimePrompt,
} from '../../components/HomeScreen';

const HomeScreen = () => {
    const [user, setUser] = useRecoilState(userState);
    const [customTime] = useRecoilState(customTimeState);
    const [showCustomTimePrompt, setShowCustomTimePrompt] = useState(false);
    const userMenuRef = useRef(null);

    const logout = () => {
        AsyncStorage.removeItem('accessToken');
        setUser(null);
    };

    const showCustomTimePromptHandler = () => {
        userMenuRef.current.close();
        setShowCustomTimePrompt(true);
    };

    console.log({ customTime });

    return (
        <SafeAreaView className="flex-1">
            <StatusBar
                translucent={false}
                style="dark"
                backgroundColor="transparent"
            />

            <ScrollView className="flex-1">
                {/* Header */}
                <View className="flex-row justify-between p-5">
                    <View>
                        <Text className="font-semibold text-lg">
                            Halo, {user.nickname} 👋
                        </Text>
                        <Text className="text-gray-600">
                            Kelas {user.class}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => userMenuRef.current.show()}
                    >
                        <Image
                            source={{
                                uri: user.imageUrl,
                            }}
                            className="w-10 h-10 rounded-full object-cover bg-gray-400"
                        />
                    </TouchableOpacity>
                </View>

                {/* Announcement */}
                {/* <View className="p-5 pt-0">
                    <View className="p-3 border-2 border-red-400 rounded-xl bg-red-100">
                        <View className="absolute -top-2 -left-2 bg-red-500 rounded-full p-0.5 border border-red-400">
                            <MegaphoneIcon color="white" size={15} />
                        </View>
                        <Text className="font-semibold text-xs">
                            Kegiatan Edufair - Mohon semua siswa kumpul di aula
                            lantai 4
                        </Text>
                    </View>
                </View> */}

                <QuickButtons />
                <ScheduleOverview />

                {/* Mading */}
                <View className="p-5 mt-3">
                    <View className="flex-row items-center space-x-1">
                        <Squares2X2Icon color="black" />
                        <Text className="text-lg font-semibold">Mading</Text>
                    </View>

                    <View className="mt-5 space-y-4">
                        <TouchableOpacity className="p-4 border-2 border-gray-400/50 rounded-2xl space-y-3">
                            <Text className="font-semibold">
                                Beasiswa 100% BINUS
                            </Text>
                            <View className="flex-row items-center space-x-2">
                                <Image
                                    source={{
                                        uri: 'https://avatars.dicebear.com/api/big-ears-neutral/cecep%20suparyo.png',
                                    }}
                                    className="w-4 h-4 rounded-full"
                                />
                                <Text className="text-gray-500 text-xs">
                                    Cecep Suparyo &middot; 3 menit yang lalu
                                </Text>
                            </View>
                            <Text className="text-gray-700">
                                Eiusmod nisi in proident adipisicing est commodo
                                et culpa. Aute est laboris cupidatat laborum
                                fugiat. Enim exercitation ea aliquip consectetur
                                tempor laborum elit.{' '}
                                <Text className="text-blue-500">
                                    Baca Selengkapnya
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <CustomTimePrompt
                visible={showCustomTimePrompt}
                onClose={() => setShowCustomTimePrompt(false)}
            />

            <BottomSheet ref={userMenuRef} height={150} hasDraggableIcon>
                <View className="p-5 space-y-3.5">
                    <TouchableOpacity
                        onPress={showCustomTimePromptHandler}
                        className="flex-row items-center space-x-2"
                    >
                        <ClockIcon color="black" size={20} />
                        <Text className="font-medium">Custom waktu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={logout}
                        className="flex-row items-center space-x-2"
                    >
                        <ArrowLeftOnRectangleIcon
                            color={colors.red[500]}
                            size={20}
                        />
                        <Text className="font-medium text-red-500">Logout</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default HomeScreen;
