import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    QrCodeIcon,
    AtSymbolIcon,
    ExclamationCircleIcon,
} from 'react-native-heroicons/outline';
import loadash from 'lodash';

import { Text, TextInput } from '../../components/global';
import { backToSchool } from '../../assets/images';
import { emailRegex } from '../../constants/regex';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors({});

        if (email) {
            const isEmailValid = email.match(emailRegex);
            if (!isEmailValid) {
                setErrors((current) => ({
                    ...current,
                    email: 'Format email tidak sesuai',
                }));
            }
        }

        if (email === '') {
            setErrors((current) => ({
                ...current,
                email: 'Email harus diisi',
            }));
        }

        if (password === '') {
            setErrors((current) => ({
                ...current,
                password: 'Password harus diisi',
            }));
        }
    }, [email, password]);

    const isValid = Boolean(loadash.isEmpty(errors) && email && password);

    const loginWithEmail = () => {
        console.log({ email, password });
    };

    return (
        <SafeAreaView className="flex-1">
            <StatusBar />
            <Image
                source={backToSchool}
                className="w-full h-[50%] object-contain"
            />
            <View className="absolute bottom-0 w-full bg-white p-8 rounded-t-3xl">
                {/* Header */}
                <View className="flex-row justify-between items-center">
                    <Text
                        className="font-bold text-2xl"
                        fontFamily="Inter-Bold"
                    >
                        Masuk
                    </Text>
                    <TouchableOpacity className="bg-red-500 flex-row items-center space-x-2 px-2 py-1 rounded-lg">
                        <ExclamationCircleIcon size={20} color="white" />
                        <Text className="text-white font-medium text-xs">
                            Info Penting
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Input Form */}
                <View className="mt-4 space-y-4">
                    <View>
                        <Text
                            className="text-xs text-gray-600"
                            style={{
                                fontFamily: 'Inter-Medium',
                            }}
                        >
                            Email
                        </Text>
                        <TextInput
                            placeholder="example@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        {errors.email && (
                            <Text className="text-[10px] text-red-400 mt-0.5 font-medium">
                                {errors.email}
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text
                            className="text-xs text-gray-600"
                            style={{
                                fontFamily: 'Inter-Medium',
                            }}
                        >
                            Password
                        </Text>
                        <TextInput
                            placeholder="secretpassword"
                            autoCapitalize="none"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {errors.password && (
                            <Text className="text-[10px] text-red-400 mt-0.5 font-medium">
                                {errors.password}
                            </Text>
                        )}
                    </View>
                </View>

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
                    <TouchableOpacity className="border py-3 rounded-full shadow-2xl flex-row justify-center items-center space-x-3">
                        <QrCodeIcon size={20} color="black" />
                        <Text className="font-semibold text-center">
                            Masuk dengan QR Code
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
