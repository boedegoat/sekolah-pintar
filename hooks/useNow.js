import { useEffect, useState } from 'react';

const useNow = () => {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return now;
};

export default useNow;
