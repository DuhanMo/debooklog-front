/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param {string | Date} date - 변환할 날짜
 * @returns {string} - 변환된 날짜 문자열
 */
export const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // YYYY-MM-DD 형식 반환
};

/**
 * 긴 문자열을 특정 길이로 자르고 '...'을 추가
 * @param {string} text - 변환할 텍스트
 * @param {number} length - 최대 길이 (기본값: 100)
 * @returns {string} - 변환된 텍스트
 */
export const truncateText = (text, length = 100) => {
    if (!text) return "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
};
