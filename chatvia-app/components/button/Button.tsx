import styles from './Button.module.css';

export function Button(props: any) {
    return (
        <button type={props.type} className={`btn ${styles.btn_primary} ${props.className}`}
                onClick={props.callbackfunc}>
                {props.children}
        </button>
    );
};