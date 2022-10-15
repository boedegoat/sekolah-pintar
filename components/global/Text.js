import { Text as RnText } from 'react-native';
import React from 'react';

const Text = ({ children, ...props }) => {
    return (
        <RnText style={{ fontFamily: 'Inter-Regular' }} {...props}>
            {children}
        </RnText>
    );
};

export default Text;
