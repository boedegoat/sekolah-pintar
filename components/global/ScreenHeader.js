import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import cn from 'classnames';
import Text from './Text';

const ScreenHeader = ({ title, rightElement }) => {
    const navigation = useNavigation();

    return (
        <View
            className={cn(
                'px-5 py-4 flex-row justify-between items-center shadow-2xl'
            )}
        >
            <View className="flex-row items-center space-x-4">
                <TouchableOpacity onPress={navigation.goBack}>
                    <ArrowLeftIcon color="black" />
                </TouchableOpacity>
                <Text className="font-semibold text-lg">{title}</Text>
            </View>
            {rightElement}
        </View>
    );
};

export default ScreenHeader;
