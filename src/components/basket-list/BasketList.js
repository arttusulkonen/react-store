import React from 'react';import BasketItem from "../basket-item";const BasketList = (props) => {  const {order = [],    handleBasketShow = Function.prototype,    removeFromBasket = Function.prototype,    incrementCount = Function.prototype,    decQuantity = Function.prototype  } = props;  const totalPrice = order.reduce((sum, el) => {    return sum + el.price * el.quantity  }, 0)  return (    <ul className="collection basket-list">      <li className="collection-item active">Cart</li>      {order.length ? order.map(item => <BasketItem decQuantity={decQuantity} incrementCount={incrementCount} key={item.id} {...item} removeFromBasket={removeFromBasket}/>) : <li className='collection-item'>Cart is empty</li>}      <li className="collection-item active">Total: {totalPrice} rub.</li>      <i className='material-icons basket-close' onClick={handleBasketShow}>close</i>    </ul>  );};export default BasketList;