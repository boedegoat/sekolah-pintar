import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';

import request from '../../utils/request';
import { userState } from '../../states';

const QRCodeScannerScreen = () => {
    const [scanned, setScanned] = useState(false);
    const toast = useToast();
    const setUser = useSetRecoilState(userState);

    const login = async ({ data: loginUrl }) => {
        setScanned(true);
        let id;

        try {
            id = toast.show('Loading...', {
                type: 'loading',
                swipeEnabled: false,
                duration: 99999,
            });

            const { data: response } = await request.post(loginUrl);

            AsyncStorage.setItem('accessToken', response.data.accessToken);
            setUser(response.data.user);

            toast.update(id, 'Berhasil masuk', {
                type: 'success',
                duration: 3000,
                swipeEnabled: true,
            });
        } catch (error) {
            console.log({ error });
            toast.update(id, 'QR Code tidak dikenali', {
                type: 'error',
                duration: 3000,
                swipeEnabled: true,
            });
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : login}
                style={StyleSheet.absoluteFillObject}
            />
        </SafeAreaView>
    );
};

export default QRCodeScannerScreen;
