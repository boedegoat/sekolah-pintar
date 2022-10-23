import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import {
    BookOpenIcon,
    ChatBubbleLeftIcon,
    QrCodeIcon,
} from 'react-native-heroicons/outline';

import { Text } from '../global';

const QuickButton = () => {
    const navigation = useNavigation();

    return (
        <View className="mx-5 mb-5 flex-row items-center space-x-4 border-2 border-gray-400/50 rounded-2xl p-2">
            {/* Display poin */}
            <TouchableOpacity
                className="bg-black rounded-xl p-3 pr-12 shadow-2xl"
                onPress={() =>
                    alert('Untuk saat ini, fitur poin belum tersedia')
                }
            >
                <Text className="text-[10px] font-semibold text-white">
                    ⭐ Poin Anda
                </Text>
                <Text className="font-bold text-lg text-white">50,000</Text>
            </TouchableOpacity>
            <View className="flex-1 flex-row space-x-3">
                <TouchableOpacity
                    className="items-center space-y-1"
                    onPress={() =>
                        alert('Untuk saat ini, fitur absen belum tersedia')
                    }
                >
                    <QrCodeIcon color="black" />
                    <Text className="text-xs font-medium">Absen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="items-center space-y-1"
                    onPress={() => navigation.navigate('Agenda')}
                >
                    <BookOpenIcon color="black" />
                    <Text className="text-xs font-medium">Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="items-center space-y-1"
                    onPress={() =>
                        alert('Untuk saat ini, fitur chat belum tersedia')
                    }
                >
                    <ChatBubbleLeftIcon color="black" />
                    <Text className="text-xs font-medium">Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default QuickButton;
