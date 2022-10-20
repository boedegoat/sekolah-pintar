import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import colors from 'tailwindcss/colors';
import { CalendarIcon, ForwardIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

import { daftarPelajaranSenin } from '../../constants/dummyData';
import { useNow } from '../../hooks';
import ScheduleSubject from './ScheduleSubject';

const ScheduleOverview = () => {
    const navigation = useNavigation();
    const now = useNow();
    const [schoolEnd, setSchoolEnd] = useState(false);

    useEffect(() => {
        if (
            new Date().setHours(15, 0) <= now &&
            now < new Date().setHours(16, 0)
        ) {
            setSchoolEnd(true);
        } else {
            setSchoolEnd(false);
        }
    }, [now]);

    const mergedSchedule = useMemo(
        () =>
            daftarPelajaranSenin.reduce((result, curr) => {
                const lastItem = result[result.length - 1];

                if (lastItem?.subjectId === curr.subjectId) {
                    const updatedLastItem = {
                        ...lastItem,
                        jadwal:
                            lastItem.jadwal.slice(0, 8) + curr.jadwal.slice(8),
                    };
                    result[result.length - 1] = updatedLastItem;
                    return result;
                }

                return [...result, curr];
            }, []),
        []
    );

    const currentSubjectIndex = useMemo(
        () =>
            mergedSchedule.findIndex((item) => {
                const [start, end] = item.jadwal
                    .split(' - ')
                    .map((time) =>
                        new Date().setHours(
                            Number(time.slice(0, 2)),
                            Number(time.slice(3))
                        )
                    );

                return start <= now && now < end;
            }),
        []
    );

    const currentSubject = mergedSchedule[currentSubjectIndex];

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
                    <Text className="w-[40%] flex-grow p-2 rounded-lg font-medium text-white bg-purple-600">
                        1. Biologi
                    </Text>
                    <Text className="w-[40%] flex-grow p-2 rounded-lg font-medium text-white bg-fuchsia-600">
                        2. Matematika Minat
                    </Text>
                    <Text className="w-[40%] flex-grow p-2 rounded-lg font-medium text-white bg-sky-600">
                        3. Prakarya
                    </Text>
                    <Text className="w-[40%] flex-grow p-2 rounded-lg font-medium text-white bg-blue-500">
                        4. Seni Budaya
                    </Text>
                    <Text className="w-[40%] flex-grow p-2 rounded-lg font-medium text-white bg-green-600">
                        5. PPKN
                    </Text>
                </View>
            </View>

            {/* Agenda */}
            <View className="mt-2">
                <Text className="font-medium mt-3 mb-3">Agenda</Text>
            </View>
        </View>
    );
};

export default ScheduleOverview;
