import React, { useState } from 'react';
import bookshelfService from '../services/bookshelfService';

const BookshelfEdit = ({ bookshelfId, currentName, onUpdate }) => {
    // newName: 현재 입력값, isEditing: 편집 모드 여부
    const [newName, setNewName] = useState(currentName);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 편집 모드로 전환
    const handleEditToggle = () => {
        setIsEditing(true);
    };

    // 취소 시 원래 값으로 복구하고 편집 모드를 종료
    const handleCancel = () => {
        setNewName(currentName);
        setIsEditing(false);
        setError(null);
    };

    // 수정 저장: API 호출 후 편집 모드 종료
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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new bookshelf name"
                    disabled={!isEditing}
                />
                {isEditing ? (
                    <>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button type="button" onClick={handleCancel} disabled={loading}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={handleEditToggle}>
                        Edit
                    </button>
                )}
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    );
};

export default BookshelfEdit;
