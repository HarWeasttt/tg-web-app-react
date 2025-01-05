import React, { useCallback, useEffect, useState } from "react"; // Добавлен useState
import { useTelegram } from "../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState(''); // Добавлено объявление состояния
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical'); // Исправлено на 'physical'
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        };
        tg.onSendData(JSON.stringify(data));
    }, [country, street, subject, tg]); // Добавлено tg в зависимости

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]); // Добавлены зависимости

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Send"
        });
    }, [tg]); // Добавлено tg в зависимости

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [street, country, tg]); // Добавлено tg в зависимости

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    };

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    };

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    };

    return (
        <div className={'form'}>
            <h3>Input Data</h3>
            <input 
                className={'input'} 
                type="text" 
                placeholder={'Country'} 
                value={country} 
                onChange={onChangeCountry} 
            />
            <input 
                className={'input'} 
                type="text" 
                placeholder={'Street'} 
                value={street} 
                onChange={onChangeStreet} 
            />
            <select 
                className={'select'}  
                value={subject} 
                onChange={onChangeSubject}
            >
                <option value={'physical'}>Physical</option> {/* Исправлено на 'Physical' */}
                <option value={'legal'}>Legal</option>
            </select>
        </div>
    );
};

export default Form;