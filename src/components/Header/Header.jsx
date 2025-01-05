import React from "react";
import Button from "../button/Button";

const Header = () => {
    const tg = window.Telegram.WebApp;
    const onClose = () => {
        tg.close(); // Закрываем веб-приложение Telegram
      };
    return (
        <div className={'header'}>
            <Button onClick={onClose}>Close</Button>
            <span className={'username'}>
                {tg.initdataUnsafe?.user?.username}
            </span>
        </div>
    )
}