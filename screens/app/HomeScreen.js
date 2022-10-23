import {
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    View,
    Image,
} from 'react-native';
import React from 'react';
import { useRecoilState } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import { BellAlertIcon } from 'react-native-heroicons/outline';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/global';
import { userState } from '../../states';
import ScheduleOverview from '../../components/HomeScreen/ScheduleOverview';

// TODO: bikin sistem jadwal pelajaran dan agenda

const HomeScreen = () => {
    const [user] = useRecoilState(userState);
    // const navigation = useNavigation();

    // const logout = () => {
    //     AsyncStorage.removeItem('accessToken');
    //     setUser(null);
    // };

    console.log({ user });

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
                    <TouchableOpacity>
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

                {/* Schedule Overview */}
                <ScheduleOverview />

                {/* Mading */}
                <View className="p-5 mt-3">
                    <View className="flex-row items-center space-x-1">
                        <BellAlertIcon color="black" />
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
        </SafeAreaView>
    );
};

export default HomeScreen;
