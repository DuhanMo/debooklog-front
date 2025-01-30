import React from "react";

/**
 * 재사용 가능한 입력(Input) 컴포넌트
 * @param {Object} props
 * @param {string} props.value - 입력 필드 값
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - 값 변경 이벤트 핸들러
 * @param {string} [props.placeholder] - 플레이스홀더 텍스트
 * @param {string} [props.type] - 입력 필드 타입 (기본값: "text")
 * @param {boolean} [props.disabled] - 입력 필드 비활성화 여부 (기본값: false)
 * @returns {JSX.Element}
 */
const Input = ({ value, onChange, placeholder = "", type = "text", disabled = false }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
};

export default Input;
