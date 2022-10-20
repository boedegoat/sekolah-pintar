import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import cn from 'classnames';
import colors from 'tailwindcss/colors';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const ScheduleSubject = ({ subject, current, title }) => {
    return (
        <TouchableOpacity
            className={cn(
                'w-[300px] mr-3 p-4 rounded-2xl',
                (!current || !subject.color) && 'border-2 border-gray-400/50'
            )}
            style={
                current
                    ? {
                          backgroundColor: subject.color,
                      }
                    : undefined
            }
        >
            <View className="flex-row justify-between items-center">
                <Text
                    className="text-xs font-medium"
                    style={
                        current
                            ? {
                                  color: subject.color
                                      ? 'white'
                                      : colors.gray[600],
                              }
                            : undefined
                    }
                >
                    {title}
                </Text>
                <ChevronRightIcon
                    size={15}
                    color={current ? 'white' : 'black'}
                />
            </View>
            <Text
                className="font-bold text-2xl"
                style={
                    current
                        ? {
                              color: subject.color ? 'white' : colors.gray[600],
                          }
                        : undefined
                }
            >
                {subject.nama}
            </Text>
            {subject.guru && (
                <View className="flex-row items-center space-x-2 mt-1">
                    <Image
                        source={{
                            uri: 'https://avatars.dicebear.com/api/big-ears-neutral/gilang.png',
                        }}
                        className="w-6 h-6 rounded-full"
                    />
                    <Text
                        style={
                            current
                                ? {
                                      color: subject.color
                                          ? 'white'
                                          : colors.gray[600],
                                  }
                                : undefined
                        }
                    >
                        {subject.guru}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default ScheduleSubject;
