import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const questions = [
    { question: "Какой жанр книг вам больше всего интересен?", options: ['Фантастика', 'Детектив', 'Роман', 'Научная литература'] },
    { question: "Вы предпочитаете читать книги в бумажном или электронном формате?", options: ['Бумажном', 'Электронном'] },
    { question: "Какой автор вам нравится больше всего?", options: ['Лев Толстой', 'Дж.К. Роулинг', 'Федор Достоевский', 'Агата Кристи'] },
    { question: "Какую книгу вы бы порекомендовали другим?", options: ['1984', 'Гарри Поттер', 'Преступление и наказание', 'Убить пересмешника'] },
    { question: "Сколько книг вы читаете в месяц?", options: ['1-2', '3-5', 'больше 5'] },
];

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const { tg } = useTelegram();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [responses, setResponses] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject,
            responses
        };
        console.log('Отправляемые данные:', data); // Логируем данные перед отправкой
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject, responses]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', () => {
            if (quizCompleted) {
                onSendData(); // Отправляем данные только если квиз завершен
            }
        });
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, quizCompleted]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: quizCompleted ? 'Отправить данные' : 'Следующий вопрос'
        });
    }, [quizCompleted]);

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    };

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    };

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedOption) {
            setResponses([...responses, selectedOption]);
            setSelectedOption('');
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setQuizCompleted(true);
            }
        }
    };

    return (
        <div className={"form"}>
            <h3>Квиз на тему ваших книжных интересов</h3>
            {!quizCompleted ? (
                <div>
                    <h4>{questions[currentQuestion].question}</h4>
                    {questions[currentQuestion].options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                            />
                            {option}
                        </div>
                    ))}
                    <button onClick={handleNextQuestion}>Следующий вопрос</button>
                </div>
            ) : (
                <div>
                    <h4>Квиз завершен! Ваши ответы:</h4>
                    <ul>
                        {responses.map((response, index) => (
                            <li key={index}>{questions[index].question} - {response}</li>
                        ))}
                    </ul>
                </div>
            )}
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;