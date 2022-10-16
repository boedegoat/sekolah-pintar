import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/global';
import { calculator, book, pencil, paint, thropy } from '../../assets/icons';

const Intro = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1">
            <StatusBar style="dark" />
            <View className="flex-1">
                <SvgXml
                    className="absolute top-72 -left-8"
                    width="140"
                    height="140"
                    xml={calculator}
                />
                <SvgXml
                    className="absolute top-10 -right-5"
                    width="130"
                    height="130"
                    xml={book}
                />
                <SvgXml
                    className="absolute top-64 -right-7"
                    width="160"
                    height="160"
                    xml={pencil}
                />
                <SvgXml
                    className="absolute top-10 left-5"
                    width="120"
                    height="120"
                    xml={paint}
                />
                <SvgXml
                    className="absolute top-40 left-20 -rotate-[30deg]"
                    width="200"
                    height="200"
                    xml={thropy}
                />
            </View>
            <View className="absolute bottom-0 w-full p-5">
                <View className="p-5 py-8">
                    <Text
                        className="text-center font-bold text-2xl"
                        style={{
                            fontFamily: 'Inter-Bold',
                        }}
                    >
                        Sudah siap untuk belajar?
                    </Text>
                    <Text className="text-center mt-3 text-gray-500">
                        Rasakan pengalaman sekolah modern yang lebih praktis dan
                        asik
                    </Text>
                    <TouchableOpacity
                        className="mt-5 bg-black py-3 rounded-full shadow-2xl"
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text className="font-semibold text-white text-center text-lg">
                            Mulai Sekarang
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Intro;
