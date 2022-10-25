import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import cn from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {
    AdjustmentsHorizontalIcon,
    CalendarIcon,
    CheckIcon,
    PlusIcon,
    TagIcon,
} from 'react-native-heroicons/outline';
import { useRecoilState } from 'recoil';
import colors from 'tailwindcss/colors';

// import request from '../../utils/request';
import { ScreenHeader, Text } from '../../components/global';
import { agendasState } from '../../states';
import { getFullDate } from '../../utils/date';

const AgendaScreen = () => {
    const navigation = useNavigation();
    const [agendas, setAgendas] = useRecoilState(agendasState);
    const [sortBy, setSortBy] = useState('latest');
    const filterMenuRef = useRef(null);
    const [tagsSelected, setTagsSelected] = useState([]);

    useEffect(() => {
        const getAgendasFromStorage = async () => {
            const agendasInStorage = await AsyncStorage.getItem('agendas');

            if (agendasInStorage) {
                setAgendas(JSON.parse(agendasInStorage));
            }
        };

        getAgendasFromStorage();
    }, []);

    useEffect(() => {
        const saveAgendasToStorage = async () => {
            await AsyncStorage.setItem('agendas', JSON.stringify(agendas));
        };

        saveAgendasToStorage();
    }, [agendas]);

    const createNewAgenda = () => {
        // request.post('/agendas', {
        //     title: '',
        //     body: '',
        // });
        const id = Date.now();
        setAgendas((a) => [
            ...a,
            {
                id,
                title: '',
                tags: [],
                body: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        navigation.navigate('AgendaDetails', { id, mode: 'edit' });
    };

    const switchSortBy = () => {
        setSortBy(sortBy === 'latest' ? 'oldest' : 'latest');
    };

    const filteredAgendas = useMemo(() => {
        return agendas
            .slice()
            .filter((agenda) =>
                tagsSelected.every((tagSelected) =>
                    agenda.tags.includes(tagSelected)
                )
            )
            .sort((a, b) => {
                if (sortBy === 'latest') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
    }, [sortBy, tagsSelected, agendas]);

    const tagsUsed = useMemo(
        () =>
            agendas.reduce((tags, curr) => {
                return [...new Set([...tags, ...curr.tags])];
            }, []),
        [agendas]
    );

    const selectTag = (tag) => {
        const index = tagsSelected.indexOf(tag);

        // if tag already selected
        if (index !== -1) {
            setTagsSelected((t) => [
                ...t.slice(0, index),
                ...t.slice(index + 1),
            ]);
            return;
        }

        // if tag is not selected
        setTagsSelected((t) => [...t, tag]);
    };

    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <ScreenHeader
                title="Agenda"
                rightElement={
                    <View className="flex-row items-center space-x-2">
                        <TouchableOpacity
                            onPress={createNewAgenda}
                            className="flex-row items-center space-x-2"
                        >
                            <PlusIcon color={colors.blue[500]} size={20} />
                            <Text className="text-xs font-medium text-blue-500">
                                Buat baru
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />

            {/* Filters */}
            <View className="p-5 pt-3 pb-0 flex-row space-x-2">
                <TouchableOpacity
                    onPress={switchSortBy}
                    className="px-2 py-0.5 bg-blue-500 rounded-lg flex-row items-center space-x-1"
                >
                    <Text className="text-white text-xs font-medium">
                        {sortBy === 'latest' ? 'terbaru' : 'terlama'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => filterMenuRef.current.show()}
                    className="px-2 py-0.5 border-2 border-gray-400/50 rounded-lg flex-row items-center space-x-1"
                >
                    {tagsSelected.length > 0 && (
                        <View className="w-2 h-2 rounded-full bg-red-500 absolute -top-1 -right-1" />
                    )}
                    <AdjustmentsHorizontalIcon color="black" size={18} />
                    <Text className="text-xs font-medium">Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Agenda List */}
            <View className="flex-1 mx-5">
                {agendas.length > 0 ? (
                    <FlatList
                        data={filteredAgendas}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('AgendaDetails', {
                                        id: item.id,
                                    })
                                }
                                className="p-3 rounded-xl border-2 border-gray-400/50 mt-5"
                            >
                                <Text className="font-semibold text-lg">
                                    {item.title || 'Tanpa judul'}
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
                                {item.tags.length > 0 && (
                                    <View className="flex-row space-x-1 items-center">
                                        <TagIcon
                                            size={15}
                                            color={colors.gray[600]}
                                        />
                                        <Text className="text-gray-600 text-xs">
                                            {item.tags.join(', ')}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    // Empty agenda view
                    <View className="flex-1 items-center justify-center">
                        <Text>Anda belum punya agenda nih...</Text>
                        <TouchableOpacity
                            onPress={createNewAgenda}
                            className="flex-row items-center space-x-2 mt-2"
                        >
                            <PlusIcon color={colors.blue[500]} />
                            <Text className="font-medium text-blue-500">
                                Buat agenda baru
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <BottomSheet ref={filterMenuRef} height={300} hasDraggableIcon>
                <View className="p-5 space-y-6">
                    <Text className="text-center font-medium text-lg">
                        Tags
                    </Text>
                    <View className="flex-row flex-wrap justify-center">
                        {tagsUsed.map((tag) => {
                            const isTagSelected = tagsSelected.includes(tag);

                            return (
                                <TouchableOpacity
                                    className={cn(
                                        'm-1 p-2 border rounded-md flex-row items-center space-x-1',
                                        isTagSelected
                                            ? 'border-blue-500/50 bg-blue-100'
                                            : 'border-gray-400/50'
                                    )}
                                    key={tag}
                                    onPress={() => selectTag(tag)}
                                >
                                    <Text className="font-medium text-xs">
                                        {tag}
                                    </Text>
                                    {isTagSelected && (
                                        <CheckIcon
                                            color={colors.blue[500]}
                                            size={15}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default AgendaScreen;
