import { useContext, useEffect, useState } from "react";
import cartContext from "../../Store/Cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{

    const [btnHighlighted,setBtnHighlighted] = useState(false)

    const carCtx = useContext(cartContext);
    const {items} = carCtx

    const numberOfCartItems = items.reduce((curNum,item)=>{
        return curNum + item.amount
    },0)

    const clickCartHandler = (e)=>{
        props.onClickCart(e.target.value)
    }

    const btnStyles = `${styles.button} ${btnHighlighted? styles.bump :''}`

    useEffect(()=>{
        if(items.length === 0)
        return;

        setBtnHighlighted(true)
        const timer = setTimeout(()=>{
            setBtnHighlighted(false)
        },300)
        return()=>{
            clearTimeout(timer)
        }
    },[items])

    return(
        <button className={btnStyles} onClick={clickCartHandler}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton;