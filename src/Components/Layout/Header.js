import { Fragment } from "react";
import mealImage from "../../Assets/meal.jpg";
import styles from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

    const clickHandler = (e)=>{
        props.onShowCart(e)
    }

  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClickCart= {clickHandler}/>
      </header>
      <div className={styles['main-image']}>
        <img src={mealImage} alt="Delicious Foods!"></img>
      </div>
    </Fragment>
  );
};
export default Header;
