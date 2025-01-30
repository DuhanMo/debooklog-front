import React from "react";

/**
 * 재사용 가능한 버튼 컴포넌트
 * @param {Object} props
 * @param {string} props.label - 버튼에 표시될 텍스트
 * @param {() => void} props.onClick - 클릭 이벤트 핸들러
 * @param {string} [props.type] - 버튼 타입 (기본값: "button")
 * @param {boolean} [props.disabled] - 버튼 비활성화 여부 (기본값: false)
 * @returns {JSX.Element}
 */
const Button = ({ label, onClick, type = "button", disabled = false }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;
