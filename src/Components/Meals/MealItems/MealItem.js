import { useContext } from 'react';
import cartContext from '../../../Store/Cart-context';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemform';

const MealItem = (props) =>{

    const CarCtx = useContext(cartContext)

    const price = `INR ${props.price.toFixed(2)}`

    const addToCartHandler = (amount)=>{
        CarCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
            </div>
            <div className={styles.price}>{price}</div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}
export default MealItem;