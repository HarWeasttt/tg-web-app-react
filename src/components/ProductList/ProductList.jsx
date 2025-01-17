import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import Img from "../../img/101086949_0.jpg";

const products = [
    { id: '1', title: '1984', price: 500, description: 'Роман Джорджа Оруэлла о дистопии' },
    { id: '2', title: 'Мастер и Маргарита', price: 1200, description: 'Роман Михаила Булгакова о любви и добре' },
    { id: '3', title: 'Убить пересмешника', price: 600, description: 'Роман Харпера Ли о расовых предрассудках' },
    { id: '4', title: 'Гарри Поттер и философский камень', price: 800, description: 'Первая книга о приключениях Гарри Поттера' },
    { id: '5', title: 'Великий Гэтсби', price: 700, description: 'Роман Ф. Скотта Фицджеральда о богатстве и любви' },
    { id: '6', title: 'На дороге', price: 900, description: 'Роман Джека Керуака о свободе и поиске смысла' },
    { id: '7', title: 'Преступление и наказание', price: 1100, description: 'Роман Федора Достоевского о моральных дилеммах' },
    { id: '8', title: 'Моби Дик', price: 950, description: 'Роман Германа Мелвилла о поиске белого кита' },
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
