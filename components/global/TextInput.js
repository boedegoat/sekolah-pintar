import React, { forwardRef, useState } from 'react';
import { TextInput as RnTextInput } from 'react-native';

const TextInput = forwardRef(({ onFocus, onBlur, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <RnTextInput
            ref={ref}
            style={{
                fontFamily: 'Inter-SemiBold',
            }}
            className={`px-5 py-3 border-2 border-gray-300 rounded-xl mt-2 text-gray-700 ${
                isFocus ? 'border-gray-600' : 'border-gray-300'
            }`}
            onFocus={() => {
                setIsFocus(true);
                if (onFocus) onFocus();
            }}
            onBlur={() => {
                setIsFocus(false);
                if (onBlur) onBlur();
            }}
            {...props}
        />
    );
});

export default TextInput;
