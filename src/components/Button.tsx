import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

/**
 * 공통 버튼 컴포넌트
 */
const Button = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <button className={`px-4 py-2 rounded-md bg-blue-600 text-white ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
