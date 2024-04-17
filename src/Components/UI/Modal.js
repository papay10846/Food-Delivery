import { Fragment } from 'react';
import styles from './Modal.module.css';
import ReactDom from 'react-dom';

const Backdrop = props=>{
    return <div className={styles.backdrop} onClick={props.onCancel}/>
}

const ModalOverlays = props=>{
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
        </div>
}

const portalElement = document.getElementById('overlays')

const Modal = (props) =>{
    return <Fragment>
        {ReactDom.createPortal(<Backdrop onCancel={props.onCancel}/>, portalElement)}
        {ReactDom.createPortal(<ModalOverlays>{props.children}</ModalOverlays>,portalElement)}
    </Fragment>
}
export default Modal;