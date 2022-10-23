import { View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import {
    AdjustmentsHorizontalIcon,
    CalendarIcon,
    PlusIcon,
    TagIcon,
} from 'react-native-heroicons/outline';
import colors from 'tailwindcss/colors';
import { ScreenHeader, Text } from '../../components/global';
import { getFullDate } from '../../utils/date';

const agendas = [
    {
        title: 'apa kek',
        tags: ['biologi', 'tugas'],
        createdAt: new Date('22 Oct 2022 7:40'),
        body: 'lorem lorem apa yang...',
    },
    {
        title: 'Gabut aje',
        tags: ['gabut'],
        createdAt: new Date('21 Oct 2022 7:40'),
        body: 'lorem lorem apa yang...',
    },
];

const AgendaScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <ScreenHeader
                title="Agenda"
                rightElement={
                    <View className="flex-row items-center space-x-2">
                        <TouchableOpacity className="flex-row items-center space-x-2">
                            <PlusIcon color={colors.blue[500]} size={20} />
                            <Text className="text-xs font-medium text-blue-500">
                                Buat baru
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />

            {/* Filters */}
            <View className="p-5 pb-0 flex-row space-x-2">
                <TouchableOpacity className="px-2 py-0.5 bg-blue-500 rounded-lg flex-row items-center space-x-1">
                    <Text className="text-white text-xs font-medium">
                        Terbaru
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-2 py-0.5 border-2 border-gray-400/50 rounded-lg flex-row items-center space-x-1">
                    <AdjustmentsHorizontalIcon color="black" size={18} />
                    <Text className="text-xs font-medium">Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Agenda List */}
            <View className="flex-1 mx-5">
                {agendas.length !== 0 ? (
                    <FlatList
                        data={agendas}
                        renderItem={({ item }) => (
                            <TouchableOpacity className="p-3 rounded-xl border-2 border-gray-400/50 mt-5">
                                <Text className="font-semibold text-lg">
                                    {item.title}
                                </Text>
                                <View className="flex-row space-x-1 items-center">
                                    <CalendarIcon
                                        size={15}
                                        color={colors.gray[600]}
                                    />
                                    <Text className="text-gray-600 text-xs">
                                        {getFullDate(item.createdAt)}
                                    </Text>
                                </View>
                                <View className="flex-row space-x-1 items-center">
                                    <TagIcon
                                        size={15}
                                        color={colors.gray[600]}
                                    />
                                    <Text className="text-gray-600 text-xs">
                                        {item.tags.join(', ')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    // Empty agenda view
                    <View className="flex-1 items-center justify-center">
                        <Text>Anda belum punya agenda nih...</Text>
                        <TouchableOpacity className="flex-row items-center space-x-2 mt-2">
                            <PlusIcon color={colors.blue[500]} />
                            <Text className="font-medium text-blue-500">
                                Buat agenda baru
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default AgendaScreen;
