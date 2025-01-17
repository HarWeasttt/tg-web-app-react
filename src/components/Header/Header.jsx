import React from 'react';
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate, useLocation } from 'react-router-dom'; // Импортируем useLocation
import './Header.css';
import Button from '../button/Button';

const Header = () => {
    const { user, onClose } = useTelegram();
    const navigate = useNavigate();
    const location = useLocation(); // Получаем текущий путь

    const handleNavigateToProduct = () => {
        navigate('/Product');
    };

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
            
            {location.pathname === '/' && ( 
                <Button onClick={handleNavigateToProduct}>Перейти к Магазину</Button>
            )}
            
            {location.pathname === '/Product' && ( 
                <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
            )}
        </div>
    );
};

export default Header;