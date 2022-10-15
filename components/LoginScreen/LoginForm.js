import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

import { TextInput } from '../global';
import { emailRegex } from '../../constants/regex';

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
}) => {
    const [showPassword, setShowPassword] = useState(false);

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

    return (
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
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    className="absolute top-[45px] right-4"
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeIcon size={20} color="black" />
                    ) : (
                        <EyeSlashIcon size={20} color="black" />
                    )}
                </TouchableOpacity>
                {errors.password && (
                    <Text className="text-[10px] text-red-400 mt-0.5 font-medium">
                        {errors.password}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default LoginForm;
