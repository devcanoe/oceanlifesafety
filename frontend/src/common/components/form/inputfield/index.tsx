import styles from "./index.module.css";

interface IInputfield {
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange?: any;
  onKeyUp?: any;
  required?: boolean;
  type: string;
  error?: boolean;
  helperText?: any;
}

export default function InputField(props: IInputfield) {
  return (
    <>
      <div className={styles.container}>
        <small>{props.label}</small>
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          className={styles.input}
          onChange={props.onChange}
          onKeyDown={props.onKeyUp}
          disabled={props.disabled}
          required={props.required}
        />
        {props.error && (
          <small className={styles.error}>{props.helperText}</small>
        )}
      </div>
    </>
  );
}
