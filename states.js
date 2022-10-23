import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: null,
});

export const schedulesState = atom({
    key: 'scheduleState',
    default: {
        class: '',
        day: '',
        schedules: null,
    },
});
