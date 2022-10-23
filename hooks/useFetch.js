import { useEffect, useState } from 'react';
import request from '../utils/request';

const useFetch = (url, onSuccess) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await request.get(url);
                setData(onSuccess ? onSuccess(response.data) : response.data);
            } catch (error) {
                console.log({ error });
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return [data, loading];
};

export default useFetch;
