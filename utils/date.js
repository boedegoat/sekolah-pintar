import 'moment/locale/id';
import moment from 'moment';

export const getDay = (date) => {
    return moment(date).locale('en').format('dddd').toLowerCase();
};

export const getFullDate = (date) => {
    return moment(date).locale('id').format('dddd, D MMMM YYYY');
};

export const getTimeInHourAndMinutes = (date) => {
    return date.toTimeString().slice(0, 5);
};

export const getTomorrowDay = (date) => {
    const tomorrow = date.setDate(date.getDate() + 1);
    return getDay(new Date(tomorrow));
};
