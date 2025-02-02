import React, { useState } from "react";
import styled from "styled-components";
import bookshelfService from "../services/bookshelfService";

/* ✅ 스타일 정의 */
const EditContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Input = styled.input`
    font-family: "Inter", "Nunito Sans", "Noto Sans", sans-serif;
    font-size: 16px;
    padding: 8px 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    transition: border 0.2s ease-in-out;
    outline: none;
    width: 200px;
    
    &:focus {
        border-color: #0073e6;
    }

    &:disabled {
        background-color: #f5f5f5;
        color: #999;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    font-family: inherit;
    font-size: 14px;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    
    ${({ variant }) =>
    variant === "save"
        ? `background: #0073e6; color: white;
               &:hover { background: #005bb5; }`
        : variant === "cancel"
            ? `background: #ddd; color: black;
               &:hover { background: #bbb; }`
            : `background: #ff4d4f; color: white;
               &:hover { background: #d9363e; }`
}

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 8px;
`;

/* ✅ 컴포넌트 */
const BookshelfEdit = ({ bookshelfId, currentName, onUpdate }) => {
    const [newName, setNewName] = useState(currentName);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEditToggle = () => setIsEditing(true);

    const handleCancel = () => {
        setNewName(currentName);
        setIsEditing(false);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await bookshelfService.updateBookshelfName(bookshelfId, newName);
            if (onUpdate) onUpdate(newName);
            setIsEditing(false);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <EditContainer>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="책장 이름을 입력하세요"
                    disabled={!isEditing}
                />
                {isEditing ? (
                    <>
                        <Button type="submit" variant="save" disabled={loading}>
                            {loading ? "저장 중..." : "저장"}
                        </Button>
                        <Button type="button" variant="cancel" onClick={handleCancel} disabled={loading}>
                            취소
                        </Button>
                    </>
                ) : (
                    <Button type="button" onClick={handleEditToggle}>
                        수정
                    </Button>
                )}
            </Form>
            {error && <ErrorMessage>에러 발생: {error.message}</ErrorMessage>}
        </EditContainer>
    );
};

export default BookshelfEdit;
