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
// import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from 'tailwindcss/colors';
import {
    BellAlertIcon,
    CalendarIcon,
    MegaphoneIcon,
} from 'react-native-heroicons/outline';

import { Text } from '../../components/global';
import { userState } from '../../states';

// TODO: bikin sistem jadwal pelajaran dan agenda

const HomeScreen = () => {
    const [user] = useRecoilState(userState);

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
                        <Text className="text-gray-600">Kelas 12 IPA 2</Text>
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
                <View className="p-5 pt-0">
                    <View className="p-4 border-2 border-red-400 rounded-xl bg-red-100">
                        <View className="absolute -top-2 -left-2 bg-red-500 rounded-full p-0.5 border border-red-400">
                            <MegaphoneIcon color="white" size={21} />
                        </View>
                        <Text className="font-semibold">
                            Kegiatan Edufair - Mohon semua siswa kumpul di aula
                            lantai 4
                        </Text>
                    </View>
                </View>

                {/* Class Schedule */}
                <View className="mt-2">
                    <TouchableOpacity className="mx-5 flex-row justify-between items-center">
                        <View>
                            <View className="font-semibold flex-row text-xs items-center space-x-1">
                                <CalendarIcon
                                    size={18}
                                    color={colors.gray[600]}
                                />
                                <Text className="text-xs text-gray-600">
                                    Jadwal Pelajaran
                                </Text>
                            </View>
                            <Text className="font-semibold">
                                Senin, 22 Oktober 2022
                            </Text>
                        </View>
                        <Text className="text-blue-500 font-medium">
                            selengkapnya →
                        </Text>
                    </TouchableOpacity>
                    <ScrollView
                        className="mt-5"
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        decelerationRate={0}
                        snapToInterval={318}
                        snapToAlignment="center"
                    >
                        <View className="w-[300] border-2 border-gray-400/50 mr-3 p-4 rounded-2xl">
                            <Text>Pelajaran sebelumnya</Text>
                            <Text className="font-bold text-2xl mt-2">
                                Upacara
                            </Text>
                        </View>
                        <View className="w-[300] border border-gray-500 mr-3 p-4 rounded-2xl bg-gray-800">
                            <Text className="text-white">
                                Pelajaran saat ini (
                                {new Date().toLocaleTimeString().slice(0, 5)})
                            </Text>
                            <Text className="font-bold text-2xl mt-2 text-white">
                                Matematika Peminatan
                            </Text>
                            <View className="flex-row items-center space-x-2 mt-1">
                                <Image
                                    source={{
                                        uri: 'https://avatars.dicebear.com/api/big-ears-neutral/gilang.png',
                                    }}
                                    className="w-6 h-6 rounded-full"
                                />
                                <Text className="text-gray-100 font-medium">
                                    Pak Gilang
                                </Text>
                            </View>
                        </View>
                        <View className="w-[300] border-2 border-gray-400/50 mr-3 p-4 rounded-2xl">
                            <Text>Pelajaran setelahnya (09.00)</Text>
                            <Text className="font-bold text-2xl mt-2">
                                Bahasa Indonesia
                            </Text>
                            <View className="flex-row items-center space-x-2 mt-1">
                                <Image
                                    source={{
                                        uri: 'https://avatars.dicebear.com/api/big-ears-neutral/nani%20septiani.png',
                                    }}
                                    className="w-6 h-6 rounded-full"
                                />
                                <Text className="text-gray-600 font-medium">
                                    Bu Nani
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

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
