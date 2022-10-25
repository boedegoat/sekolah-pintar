import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useRecoilState } from 'recoil';

import { TextInput } from '../global';
import { customTimeState } from '../../states';

const CustomTimePrompt = ({ visible, onClose }) => {
    const [timeInput, setTimeInput] = useState(null);
    const [, setCustomTime] = useRecoilState(customTimeState);

    const setCustomTimeHandler = () => {
        try {
            if (!timeInput) {
                setCustomTime(null);
                onClose();
                return;
            }
            const customTime = new Date(timeInput);
            setCustomTime(customTime);
            alert(`Waktu berhasil dicustom ke ${customTime}`);
            onClose();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <Pressable
                onPress={() => {
                    onClose(false);
                }}
                className="flex-1 justify-center items-center bg-black/50"
            >
                <Pressable className="bg-white p-5 rounded-2xl w-[80%]">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-semibold text-lg">
                            Custom Waktu
                        </Text>
                        <TouchableOpacity
                            onPress={() => onClose(false)}
                            className="p-1"
                        >
                            <XMarkIcon size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text className="mt-3 text-xs text-gray-600">
                        Berhubung aplikasi ini menggunakan waktu perangkat Anda
                        untuk menampilkan jadwal pelajaran secara realtime, Anda
                        bisa meng-custom waktu untuk melihat bagaimana aplikasi
                        ini menampilkan jadwal pelajaran.
                    </Text>
                    <Text className="mt-1 text-xs">
                        contoh: 25 oct 2022 11:00
                    </Text>
                    <Text className="mt-1 text-xs">
                        hapus semua untuk mereset
                    </Text>
                    <TextInput
                        className="text-[14px]"
                        placeholder="tanggal bulan tahun jam"
                        value={timeInput}
                        onChangeText={(text) => setTimeInput(text)}
                    />
                    <TouchableOpacity
                        onPress={setCustomTimeHandler}
                        className="bg-black mt-3 py-2 rounded-lg"
                    >
                        <Text className="text-white text-center font-medium">
                            Simpan
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default CustomTimePrompt;
