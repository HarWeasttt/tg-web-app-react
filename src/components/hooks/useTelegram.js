const tg = window.Telegram.WebApp;

export function useTelegram(){
    const onClose = () => {
        tg.close(); // Закрываем веб-приложение Telegram
      };

    const onToggleButton = () => {
        if(tg.MainButton.isVisible){
            tg.MainButton.hide();
        }
        else{
            tg.MainButton.show();
        }
    }
    return{
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,

    }
    
    
    }