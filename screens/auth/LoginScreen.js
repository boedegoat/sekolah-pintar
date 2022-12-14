import {
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
    ScrollView,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    // QrCodeIcon,
    AtSymbolIcon,
    ExclamationCircleIcon,
} from 'react-native-heroicons/outline';
import loadash from 'lodash';
import { useSetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/global';
import { InfoModal, LoginForm } from '../../components/LoginScreen';
import { backToSchool } from '../../assets/images';
import { userState } from '../../states';
import request from '../../utils/request';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errors, setErrors] = useState({});
    const [showInfoModal, setShowInfoModal] = useState(false);
    const setUser = useSetRecoilState(userState);
    // const navigation = useNavigation();

    const isValid = Boolean(loadash.isEmpty(errors) && email && password);

    const loginWithEmail = async () => {
        Keyboard.dismiss();

        try {
            const { data: response } = await request.post('/auth/login', {
                email,
                password,
            });

            await AsyncStorage.setItem(
                'accessToken',
                response.data.accessToken
            );
            setUser(response.data.user);

            console.log({ user: response.data.user });
        } catch (error) {
            console.log({ error });
            alert(error.message);
        }
    };

    // const goToScannerScreen = async () => {
    //     const { status } = await BarCodeScanner.requestPermissionsAsync();
    //     if (status === 'granted') {
    //         navigation.navigate('QRCodeScanner');
    //     }
    // };

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <Image
                source={backToSchool}
                className="w-full h-[50%] object-contain"
            />
            <ScrollView className="absolute top-[45%] bottom-0 w-full bg-white p-8 rounded-t-3xl">
                {/* Header */}
                <View className="flex-row justify-between items-center">
                    <Text
                        className="font-bold text-2xl"
                        fontFamily="Inter-Bold"
                    >
                        Masuk
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowInfoModal(true)}
                        className="bg-red-500 flex-row items-center space-x-2 px-2 py-1 rounded-lg"
                    >
                        <ExclamationCircleIcon size={20} color="white" />
                        <Text className="text-white font-medium text-xs">
                            Info Penting
                        </Text>
                    </TouchableOpacity>
                </View>

                <InfoModal
                    visible={showInfoModal}
                    onClose={() => setShowInfoModal(false)}
                />

                <LoginForm
                    {...{
                        email,
                        setEmail,
                        password,
                        setPassword,
                        errors,
                        setErrors,
                    }}
                />

                {/* Buttons */}
                <View className="mt-10 space-y-2">
                    <TouchableOpacity
                        className={`${
                            isValid ? 'opacity-100' : 'opacity-60'
                        } bg-black py-3 rounded-full shadow-2xl flex-row justify-center items-center space-x-3 disabled:opacity-50`}
                        disabled={!isValid}
                        onPress={loginWithEmail}
                    >
                        <AtSymbolIcon size={20} color="white" />
                        <Text className="font-semibold text-white text-center">
                            Masuk dengan Email
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={goToScannerScreen}
                        className="border py-3 rounded-full shadow-2xl flex-row justify-center items-center space-x-3"
                    >
                        <QrCodeIcon size={20} color="black" />
                        <Text className="font-semibold text-center">
                            Masuk dengan QR Code
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
