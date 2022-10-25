import {
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EyeIcon, PencilIcon, TrashIcon } from 'react-native-heroicons/outline';
import colors from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native';

import { ScreenHeader, Text } from '../../components/global';
import { agendasState } from '../../states';
import { useIsKeyboardOpened } from '../../hooks';

const AgendaItemScreen = ({ route }) => {
    const { id: agendaId, mode = 'read' } = route.params;
    const [currentMode, setCurrentMode] = useState(mode);

    const [agendas, setAgendas] = useRecoilState(agendasState);
    const firstRender = useRef(true);
    const navigation = useNavigation();
    const isKeyboardOpened = useIsKeyboardOpened();

    const currentAgenda = useMemo(
        () => agendas.find((a) => a.id === agendaId),
        [agendas]
    );

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const editAgenda = () => {
            const index = agendas.findIndex((agenda) => agenda.id === agendaId);
            setAgendas((a) => [
                ...a.slice(0, index),
                {
                    ...a[index],
                    title,
                    tags: tags ? tags.replace(/\s/g, '').split(',') : [],
                    body,
                    updatedAt: new Date(),
                },
                ...a.slice(index + 1),
            ]);
        };

        editAgenda();
    }, [title, tags, body]);

    useEffect(() => {
        setTitle(currentAgenda.title);
        setTags(currentAgenda.tags.join(', '));
        setBody(currentAgenda.body);
    }, [currentMode]);

    const deleteAgenda = () => {
        Alert.alert(
            'Konfirmasi menghapus',
            'Yakin bro mau hapus agenda ini ?',
            [
                {
                    text: 'Gajadi',
                    style: 'cancel',
                },
                {
                    text: 'Hapus',
                    onPress: () => {
                        navigation.navigate('Agenda');
                        const index = agendas.findIndex(
                            (agenda) => agenda.id === agendaId
                        );
                        setAgendas((a) => [
                            ...a.slice(0, index),
                            ...a.slice(index + 1),
                        ]);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView className="flex-1">
            <ScreenHeader
                rightElement={
                    <View className="flex-row items-center space-x-3">
                        {currentMode === 'read' && (
                            <TouchableOpacity
                                onPress={() => setCurrentMode('edit')}
                            >
                                <PencilIcon
                                    color={colors.blue[500]}
                                    size={20}
                                />
                            </TouchableOpacity>
                        )}
                        {currentMode === 'edit' && (
                            <TouchableOpacity
                                onPress={() => setCurrentMode('read')}
                            >
                                <EyeIcon color={colors.blue[500]} size={20} />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={deleteAgenda}>
                            <TrashIcon color={colors.red[500]} size={20} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <ScrollView className="px-5 flex-1">
                {currentMode === 'read' && (
                    <>
                        <Text className="text-2xl font-bold">
                            {currentAgenda.title || 'Tanpa Judul'}
                        </Text>
                        <Text className="text-gray-500">
                            {currentAgenda.tags.join(',  ') || 'no tags'}
                        </Text>
                        <Text className="mt-2">{currentAgenda.body}</Text>
                    </>
                )}
                {currentMode === 'edit' && (
                    <>
                        <TextInput
                            className="text-2xl font-bold"
                            placeholder="Judul"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <TextInput
                            className="text-gray-500"
                            placeholder="Tags (pisahkan dengan koma)"
                            autoCapitalize="none"
                            value={tags}
                            onChangeText={(text) => setTags(text)}
                        />
                        <TextInput
                            className="mt-2"
                            multiline
                            placeholder="Isi catatan"
                            value={body}
                            onChangeText={(text) => setBody(text)}
                        />
                    </>
                )}
            </ScrollView>

            {!isKeyboardOpened && (
                <View className="p-1">
                    <Text className="text-center text-gray-500 text-xs">
                        Terakhir diedit pada{' '}
                        {currentAgenda.updatedAt.toLocaleString()}
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default AgendaItemScreen;
