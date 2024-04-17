import { useState } from 'react';
import './App.css';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meal from './Components/Meals/Meal';
import CartProvider from './Store/CartProvider';

function App() {

  const [isVisible,setIsVisible] = useState(false)

  const showCartHandler = (e)=>{
    setIsVisible(true)
  } 
  const cancelhandler = (e)=>{
    setIsVisible(false)
  }
  const orderHandler = (e)=>{
    console.log('Odering...')
  }
  return (
    <CartProvider>
      {isVisible && <Cart onCancel={cancelhandler} onOrder={orderHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meal/>
      </main>
    </CartProvider>
  );
}

export default App;
