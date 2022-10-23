import {
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    CalendarIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import colors from 'tailwindcss/colors';
import cn from 'classnames';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Text } from '../../components/global';
import { useNow } from '../../hooks';
import { getFullDate, getTimeInHourAndMinutes } from '../../utils/date';

const ScheduleScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // TODO: save currentSchedule, schedules into Recoil atom
    const { currentSchedule } = route.params;
    // const now = new Date('24 Oct 2022 09:15');
    const now = useNow();
    const currentTime = getTimeInHourAndMinutes(now);

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
                            {getFullDate(now)}
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
        </SafeAreaView>
    );
};

export default ScheduleScreen;
