import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { customTimeState } from '../states';

const useNow = () => {
    const [customTime] = useRecoilState(customTimeState);
    const [now, setNow] = useState(new Date());
    const interval = useRef();

    const startInterval = () => {
        interval.current = setInterval(() => {
            setNow(new Date());
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    useEffect(() => {
        if (customTime !== null) {
            clearInterval(interval.current);
            setNow(customTime);
        } else {
            startInterval();
        }
    }, [customTime]);

    return now;
};

export default useNow;
