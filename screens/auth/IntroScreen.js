import { Text, SafeAreaView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const Intro = () => {
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>Intro</Text>
        </SafeAreaView>
    );
};

export default Intro;
