import { useReducer } from "react";
import cartContext from "./Cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action)=>{
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price
       
        const existingCartItemIndex = state.items.findIndex(
            (item)=> item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        else{
            updatedItems = state.items.concat(action.item)
        }

        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
        (item)=> item.id === action.id
        )
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item=> item.id !== action.id)
        }
        else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider = props =>{
    const [cartState,dispatchCartAction]= useReducer(cartReducer,defaultCartState)

    const addItemToCartHandler = item =>{
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    }

    const deleteItemFromCartHandler = id =>{
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    }
    
    const CartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: deleteItemFromCartHandler
    }

    return <cartContext.Provider value={CartContext}>
        {props.children}
    </cartContext.Provider>
}
export default CartProvider;