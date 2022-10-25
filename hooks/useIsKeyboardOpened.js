import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';

const useIsKeyboardOpened = () => {
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsOpened(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsOpened(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return isOpened;
};

export default useIsKeyboardOpened;
