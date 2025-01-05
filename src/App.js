import React, { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready(); // Уведомляем Telegram, что приложение готово
  }, []); // Пустой массив зависимостей для выполнения один раз при монтировании


  return (
    <div className="App">
      so cool 
    </div>
  );
}

export default App;