import { useContext } from "react";
import cartContext from "../../Store/Cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(cartContext);

  const totalAmount = `INR ${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount: 1})
  };

  const Carditems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          price={items.price}
          amount={items.amount}
          onRemove={cartItemRemoveHandler.bind(null,items.id)}
          onAdd={cartItemAddHandler.bind(null,items)}
        />
      ))}
    </ul>
  );

  const clickCancelHandler = (e) => {
    props.onCancel(e.target.value);
  };

  const clickOrderHandler = (e) => {
    props.onOrder(e.target.value);
  };

  return (
    <Modal onCancel={props.onCancel}>
      {Carditems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={clickCancelHandler}>
          Close
        </button>
        {hasItems && (
          <button className={styles.button} onClick={clickOrderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
