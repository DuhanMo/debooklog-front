import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

/**
 * 공통 입력 필드 컴포넌트
 */
const Input = ({ label, className = "", ...props }: InputProps) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-gray-700">{label}</label>}
            <input
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
        </div>
    );
};

export default Input;
