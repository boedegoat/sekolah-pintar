import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import {
    CalendarIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import colors from 'tailwindcss/colors';
import cn from 'classnames';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/global';
import { daftarPelajaranSenin } from '../../constants/dummyData';

const ScheduleScreen = () => {
    const [currentTimeInNumber, setCurrentTimeInNumber] = useState(
        Number(new Date().toLocaleTimeString().slice(0, 5).replace(':', ''))
    );
    const navigation = useNavigation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTimeInNumber(
                Number(
                    new Date().toLocaleTimeString().slice(0, 5).replace(':', '')
                )
            );
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <View className="px-5 py-3 flex-row justify-between items-center border-b border-gray-300">
                <View className="flex-row items-center space-x-3">
                    <TouchableOpacity onPress={navigation.goBack}>
                        <ChevronLeftIcon color={colors.gray[600]} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View className="font-semibold flex-row text-xs items-center space-x-1">
                            <CalendarIcon size={13} color={colors.gray[600]} />
                            <Text className="text-gray-600 text-[10px]">
                                Jadwal Pelajaran
                            </Text>
                        </View>
                        <Text className="font-semibold">
                            Senin, 22 Oktober 2022
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className="border border-gray-400 p-1 rounded-lg flex-row items-center space-x-1">
                    <Text className="font-medium text-gray-600 text-xs">
                        12 IPA 2
                    </Text>
                    <ChevronDownIcon color={colors.gray[600]} size={15} />
                </TouchableOpacity>
            </View>

            <FlatList
                className="pt-0"
                data={daftarPelajaranSenin}
                contentContainerStyle={{
                    paddingBottom: 18,
                    paddingHorizontal: 20,
                }}
                renderItem={({ item }) => {
                    const startTimeInNumber = Number(
                        item.jadwal.slice(0, 5).replace('.', '')
                    );
                    const endTimeInNumber = Number(
                        item.jadwal.slice(8).replace('.', '')
                    );

                    const isCurrent =
                        startTimeInNumber <= currentTimeInNumber &&
                        currentTimeInNumber < endTimeInNumber;

                    return (
                        <View className="mt-5">
                            {isCurrent && (
                                <Text className="text-xs mb-0.5 font-medium">
                                    Sekarang:
                                </Text>
                            )}
                            <View className="flex-row justify-between items-start space-x-5 ">
                                {/* Jadwal */}
                                <View
                                    className={cn(
                                        'relative p-2.5 rounded-xl',
                                        isCurrent
                                            ? 'bg-gray-600'
                                            : 'bg-gray-200'
                                    )}
                                >
                                    {isCurrent && (
                                        <View
                                            className="absolute h-[24px] w-[5px] rounded-full top-2.5 -left-0.5"
                                            style={{
                                                backgroundColor:
                                                    item.color ||
                                                    colors.gray[500],
                                            }}
                                        />
                                    )}
                                    <Text
                                        className={cn(
                                            'font-medium',
                                            isCurrent
                                                ? 'text-white'
                                                : 'text-black'
                                        )}
                                    >
                                        {item.jadwal}
                                    </Text>
                                </View>

                                {/* Nama Pelajaran */}
                                <View
                                    className={cn(
                                        'flex-1 p-2.5 rounded-xl',
                                        !item.color && 'border border-gray-300'
                                    )}
                                    style={{
                                        backgroundColor: item.color || 'white',
                                    }}
                                >
                                    <Text
                                        className={cn(
                                            'font-semibold',
                                            item.color
                                                ? 'text-white'
                                                : 'text-black'
                                        )}
                                    >
                                        {item.nama}
                                    </Text>
                                    {item.guru && (
                                        <View>
                                            <Text className="text-white text-xs">
                                                {item.guru}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
};

export default ScheduleScreen;
