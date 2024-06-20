import React from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux"
import { addCustomerAction, removeCustomerAction } from './store/customerReduser';
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

 const addCash = (cash) => {
  dispatch({type: "ADD_CASH", payload: cash})
 }

 const getCash = (cash) => {
  dispatch({type: "GET_CASH", payload: cash})
 }

 const addCustomer = (name) => {
  const customer = {
    name,
    id: Date.now(),
  }
  dispatch(addCustomerAction(customer))
 }

 const removeCustomer = (customer) => {
  dispatch(removeCustomerAction(customer.id))
 }

  return (
    <div className="App">
        <div style={{fontSize: "3rem"}}>Баланс: {cash}</div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <button onClick={() => addCash(Number(prompt()))} >
                Пополнить счет
            </button>
            <button onClick={() => getCash(Number(prompt()))} >
                Снять со счета
            </button>
            <button onClick={() => addCustomer(prompt())} >
                Добавить клиента
            </button>
            <button onClick={() => dispatch(fetchCustomers())} >
                Все клиенты
            </button>
        </div>
        {customers.length > 0 ?
        <div>
          {customers.map(customer => 
            <div onClick={() => removeCustomer(customer)}>
              {customer.name}
            </div>)}
        </div>
        :
        <div style={{fontSize: "2rem", marginTop: "30px"}}>Клиенты отсутсвуют</div>}
    </div>
  );
}

export default App;
