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

    console.log({ currentTimeInNumber });

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
                            <CalendarIcon size={20} color={colors.gray[600]} />
                            <Text className="text-gray-600 text-xs">
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
                className="p-5 pt-0"
                data={daftarPelajaranSenin}
                contentContainerStyle={{
                    paddingBottom: 18,
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
                                <Text className="text-xs mb-0.5">
                                    Sekarang:
                                </Text>
                            )}
                            <View className="flex-row justify-between items-start space-x-5 ">
                                <View
                                    className={cn(
                                        'p-2.5 rounded-lg',
                                        isCurrent
                                            ? 'bg-gray-600'
                                            : 'bg-gray-200'
                                    )}
                                >
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
                                <View
                                    className={cn(
                                        'flex-1 p-2.5 rounded-lg',
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
