import React from 'react';
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import './Header.css';
import Button from '../button/Button';

const Header = () => {
    const { user, onClose } = useTelegram();
    const navigate = useNavigate(); // Инициализируем navigate

    const handleNavigateToForm = () => {
        navigate('/form'); // Переход на страницу формы
    };

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
            <Button onClick={handleNavigateToForm}>Перейти к форме</Button> {/* Кнопка для перехода */}
        </div>
    );
};

export default Header;