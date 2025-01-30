import { useState, useEffect } from "react";

/**
 * 데이터를 비동기적으로 가져오는 커스텀 훅
 * @param {Function} fetchFunction - 데이터를 가져오는 함수 (API 요청 함수)
 * @param {Array} dependencies - useEffect 의존성 배열 (기본값: [])
 * @returns {Object} { data, loading, error, refetch }
 */
const useFetch = (fetchFunction, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * 데이터를 가져오는 함수
     */
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, dependencies);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
