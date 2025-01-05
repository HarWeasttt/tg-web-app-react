import React, { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready(); // Уведомляем Telegram, что приложение готово
  }, []); // Пустой массив зависимостей для выполнения один раз при монтировании

  const onClose = () => {
    tg.close(); // Закрываем веб-приложение Telegram
  };

  return (
    <div className="App">
      so cool 
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;