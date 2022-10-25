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

export const agendasState = atom({
    key: 'agendasState',
    default: [],
});

export const customTimeState = atom({
    key: 'customTimeState',
    default: null,
});
