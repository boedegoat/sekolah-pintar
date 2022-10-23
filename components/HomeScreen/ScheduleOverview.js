import {
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import colors from 'tailwindcss/colors';
import { CalendarIcon, ForwardIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../global';
import { useFetch, useNow } from '../../hooks';
import ScheduleSubject from './ScheduleSubject';
import {
    getDay,
    getFullDate,
    getTimeInHourAndMinutes,
    getTomorrowDay,
} from '../../utils/date';

const ScheduleOverview = () => {
    const navigation = useNavigation();
    const [schoolEnd, setSchoolEnd] = useState(false);

    const [schedules, loading] = useFetch(
        '/schedules',
        (data) => data.schedules
    );

    // const now = new Date('24 Oct 2022 15:20');
    const now = useNow();
    const currentTime = getTimeInHourAndMinutes(now);
    const currentDay = getDay(now);

    const [currentSchedule, setCurrentSchedule] = useState(null);

    useEffect(() => {
        if (!schedules) return;
        if (currentTime >= '15:00') {
            if (currentDay === 'friday') {
                setCurrentSchedule(schedules.monday);
                return;
            }
            setCurrentSchedule(schedules[getTomorrowDay(now)]);
            return;
        }
        if (['saturday', 'sunday'].includes(currentDay)) {
            setCurrentSchedule(schedules.monday);
            return;
        }
        setCurrentSchedule(schedules[currentDay]);
    }, [schedules, currentTime]);

    useEffect(() => {
        if (currentTime >= '15:00' && currentTime < '16:00') {
            setSchoolEnd(true);
            setCurrentSchedule(schedules?.[getTomorrowDay(now)]);
        } else {
            setSchoolEnd(false);
        }
    }, [currentTime]);

    const mergedSchedule = useMemo(() => {
        return currentSchedule?.reduce((result, curr) => {
            const lastItem = result[result.length - 1];

            if (lastItem?.subject.name === curr.subject.name) {
                const updatedLastItem = {
                    ...lastItem,
                    endTime: curr.endTime,
                };
                result[result.length - 1] = updatedLastItem;
                return result;
            }

            return [...result, curr];
        }, []);
    }, [currentSchedule]);

    const currentSubjectIndex = useMemo(() => {
        if (['saturday', 'sunday'].includes(currentDay)) return undefined;
        return mergedSchedule?.findIndex((item) => {
            return currentTime >= item.startTime && currentTime < item.endTime;
        });
    }, [mergedSchedule, currentTime, currentDay]);

    // TODO: setup skeleton
    if (loading) {
        return (
            <View className="mx-5 flex-row items-center space-x-2">
                <ActivityIndicator color={colors.blue[500]} />
                <Text>Loading</Text>
            </View>
        );
    }

    const currentSubject = mergedSchedule?.[currentSubjectIndex];

    if (currentSubject) {
        const nextSubject = mergedSchedule[currentSubjectIndex + 1];

        return (
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Schedule')}
                    className="mx-5 flex-row justify-between items-center"
                >
                    <View>
                        <View className="font-semibold flex-row text-xs items-center space-x-1">
                            <CalendarIcon size={18} color={colors.gray[600]} />
                            <Text className="text-xs text-gray-600">
                                Jadwal Pelajaran
                            </Text>
                        </View>
                        <Text className="font-semibold">
                            {getFullDate(now)}
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
                    <ScheduleSubject
                        current
                        title="Pelajaran sekarang"
                        subject={currentSubject}
                    />

                    {nextSubject && (
                        <ScheduleSubject
                            title="Pelajaran selanjutnya"
                            subject={nextSubject}
                        />
                    )}
                </ScrollView>
            </View>
        );
    }

    return (
        <View className="mx-5">
            {schoolEnd && (
                <View className="mb-4">
                    <Text className="text-lg font-bold">
                        Sekolah selesai! 🎉
                    </Text>
                    <Text className="text-gray-600">
                        Saatnya bersantai sejenak sobat
                    </Text>
                </View>
            )}

            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center space-x-2">
                    <ForwardIcon color="black" />
                    <Text className="font-semibold text-lg">Next day</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Schedule')}
                >
                    <Text className="text-blue-500 font-medium text-xs">
                        Lihat jadwal lengkap
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Buku yang harus dibawa */}
            <View className="mt-2">
                <Text className="font-medium mb-3">Bawa buku</Text>
                <View className="flex-row flex-wrap gap-3">
                    {mergedSchedule
                        // filter subject that has taughtBy
                        // and removes subject name duplicates
                        ?.filter(
                            ({ subject }, index) =>
                                subject.taughtBy &&
                                mergedSchedule.findIndex(
                                    (s) => s.subject.name === subject.name
                                ) === index
                        )
                        .map(({ subject }, index) => (
                            <Text
                                className="w-[40%] flex-grow p-2 rounded-lg font-medium text-white"
                                key={subject.name}
                                style={{
                                    backgroundColor: subject.color,
                                }}
                            >
                                {index + 1}. {subject.name}
                            </Text>
                        ))}
                </View>
            </View>
        </View>
    );
};

export default ScheduleOverview;
