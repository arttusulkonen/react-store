import React, {useEffect, useState} from 'react';import {API_KEY, API_URL} from "../../config";import Preloader from "../preloader";import GoodsList from "../goods-list/GoodsList";import Cart from "../cart";import BasketList from "../basket-list";function Main() {  const [goods, setGoods] = useState([])  const [loading, setLoading] = useState(true)  const [order, setOrder] = useState([])  const [isBasketShow, setBasketShow] = useState(false)  function addToBasket(item){    /// находим индекс каждого элемента    const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)    // если такого элемента нет в order, получаем -1 и добавляем в order    if(itemIndex < 0){      const newItem = {        ...item,        quantity: 1      }      setOrder([...order, newItem])    } else { // если есть такой элемент, то просто добавляем quantity + 1      const newOrder = order.map((orderItem, index) => {        if(index === itemIndex){          return {            ...orderItem,            quantity: orderItem.quantity + 1          }        } else {          return orderItem;        }      })      setOrder(newOrder) // добавляем в стейт    }  }  function removeFromBasket(id){    const findItem = order.filter(el => el.id !== id)    setOrder(findItem)  }  function handleBasketShow(){    setBasketShow(!isBasketShow)  }  function incQuantity(itemId) {    /// создаём новую переменную куда закидываем массив order    const newOrder = order.map((el) => {      if(el.id === itemId){ // если id одинаковы, то создаём новую переменную где увеличиваем quantity        const newQuantity = el.quantity + 1        return { // и возвращаем всю историю          ...el, // все полученные элементы          quantity: newQuantity, // и увеличенный quantity        }      } else {        return el;      }    })    setOrder(newOrder)  }  function decQuantity(itemId) {    const newOrder = order.map((el) => {      if(el.id === itemId){ // если id одинаковы, то создаём новую переменную где уменьшаем quantity        const newQuantity = el.quantity - 1        return { // и возвращаем всю историю          ...el, // все полученные элементы          quantity: newQuantity >= 0 ? newQuantity : 0, // проверка. если больше 0. то возвращаем новый quantity, в противном случае устанавливаем 0        }      } else {        return el;      }    })    setOrder(newOrder)  }  useEffect(function getGoods(){    fetch(API_URL, {      headers: { // устанавливаем header        'Authorization': API_KEY      }    }).then(response => response.json())      .then((data) => {        data.featured && setGoods(data.featured)        setLoading(false)      })  }, [])  return (    <main className='container content'>        <Cart handleBasketShow={handleBasketShow} quantity={order.length}/>        {loading ? <Preloader /> : <GoodsList addToBasket={addToBasket} goods={goods} />}        {isBasketShow && <BasketList decQuantity={decQuantity} incrementCount={incQuantity} order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket}/>}        {isBasketShow ? <div className="overlay"/> : null}    </main>  );};export default Main;