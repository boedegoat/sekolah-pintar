import { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import colors from 'tailwindcss/colors';
import cn from 'classnames';
import { useRecoilState } from 'recoil';
import _ from 'lodash';
import BottomSheet from 'react-native-gesture-bottom-sheet';

import { ScreenHeader, Text } from '../../components/global';
import { useNow } from '../../hooks';
import { getTimeInHourAndMinutes } from '../../utils/date';
import { schedulesState } from '../../states';
import { days, daysInBahasa, daysInEnglish } from '../../constants/date';

const ScheduleScreen = () => {
    const [schedules] = useRecoilState(schedulesState);
    const menuRef = useRef(null);
    const [day, setDay] = useState(schedules.day);
    const [isChanged, setIsChanged] = useState(false);

    // const now = new Date('25 Oct 2022 09:15');
    const now = useNow();
    const currentTime = getTimeInHourAndMinutes(now);

    const changeDay = (newDay) => {
        setDay(newDay);
        menuRef.current.close();
    };

    useEffect(() => {
        setIsChanged(false);

        if (schedules.day !== day) {
            setIsChanged(true);
        }
    }, [day]);

    const currentSchedule = schedules.schedules?.[day || schedules.day];

    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <ScreenHeader
                title={
                    <>
                        {_.capitalize(days[day || schedules.day].id)} &middot;{' '}
                        {schedules.class}
                    </>
                }
                rightElement={
                    <TouchableOpacity
                        onPress={() => menuRef.current.show()}
                        className="flex-row items-center space-x-2"
                    >
                        <View>
                            {isChanged && (
                                <View className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-0 right-0" />
                            )}
                            <AdjustmentsHorizontalIcon
                                color={colors.blue[500]}
                                size={20}
                            />
                        </View>
                        <Text className="text-blue-500 font-medium">ubah</Text>
                    </TouchableOpacity>
                }
            />

            <FlatList
                className="pt-0"
                data={currentSchedule}
                contentContainerStyle={{
                    paddingBottom: 18,
                    paddingHorizontal: 20,
                }}
                renderItem={({ item }) => {
                    const isCurrent =
                        currentTime >= item.startTime &&
                        currentTime < item.endTime;

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
                                        isCurrent ? 'bg-black' : 'bg-gray-200'
                                    )}
                                >
                                    {isCurrent && (
                                        <View
                                            className="absolute h-[24px] w-[5px] rounded-full top-2 -left-0.5"
                                            style={{
                                                backgroundColor:
                                                    item.subject.color ||
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
                                        {item.startTime} - {item.endTime}
                                    </Text>
                                </View>

                                {/* Nama Pelajaran */}
                                <View
                                    className={cn(
                                        'flex-1 p-2.5 rounded-xl',
                                        !item.subject.color &&
                                            'border border-gray-400/50'
                                    )}
                                    style={{
                                        backgroundColor:
                                            item.subject.color || 'white',
                                    }}
                                >
                                    <Text
                                        className={cn(
                                            'font-semibold',
                                            item.subject.color
                                                ? 'text-white'
                                                : 'text-black'
                                        )}
                                    >
                                        {item.subject.name}
                                    </Text>
                                    {item.subject.taughtBy && (
                                        <View className="flex-row items-center space-x-2 mt-1">
                                            <Image
                                                source={{
                                                    uri: `https://avatars.dicebear.com/api/big-ears-neutral/${item.subject.taughtBy}.png`,
                                                }}
                                                className="w-4 h-4 rounded-full"
                                            />
                                            <Text className="text-white text-xs">
                                                {item.subject.taughtBy}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    );
                }}
            />

            <BottomSheet ref={menuRef} height={400} hasDraggableIcon>
                <View className="p-5 space-y-6">
                    <View>
                        <Text className="font-medium text-lg text-center">
                            Ubah Kelas
                        </Text>
                        <View className="mt-3 flex-row justify-center">
                            <TouchableOpacity>
                                <Text className="text-blue-500 font-semibold">
                                    12 IPA 2
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text className="font-medium text-lg text-center">
                            Ubah hari
                        </Text>
                        <View className="mt-3 space-y-2">
                            {daysInBahasa
                                .filter(
                                    (dayInBahasa) =>
                                        !['sabtu', 'minggu'].includes(
                                            dayInBahasa
                                        )
                                )
                                .map((dayInBahasa) => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            changeDay(
                                                daysInEnglish[
                                                    daysInBahasa.indexOf(
                                                        dayInBahasa
                                                    )
                                                ]
                                            )
                                        }
                                        key={dayInBahasa}
                                    >
                                        <Text
                                            className={cn(
                                                'font-medium text-center',
                                                daysInEnglish[
                                                    daysInBahasa.indexOf(
                                                        dayInBahasa
                                                    )
                                                ] === (day || schedules.day) &&
                                                    'text-blue-500 font-semibold'
                                            )}
                                        >
                                            {_.capitalize(dayInBahasa)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default ScheduleScreen;
