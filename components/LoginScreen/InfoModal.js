import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { XMarkIcon } from 'react-native-heroicons/outline';

const InfoModal = ({ visible, onClose }) => {
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
                            Info Penting
                        </Text>
                        <TouchableOpacity
                            onPress={() => onClose(false)}
                            className="p-1"
                        >
                            <XMarkIcon size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text className="mt-3">
                        Aplikasi Sekokah Pintar masih dalam tahap pengembangan.
                    </Text>
                    <View className="mt-2">
                        <Text>
                            Untuk masuk dengan Email, Anda bisa gunakan akun
                            ini:
                        </Text>
                        <View>
                            <Text>email: budi@smapj.id</Text>
                            <Text>password: budiganteng</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => onClose(false)}
                        className="bg-black mt-3 py-2 rounded-lg"
                    >
                        <Text className="text-white text-center font-medium">
                            Oke, Mengerti
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default InfoModal;
