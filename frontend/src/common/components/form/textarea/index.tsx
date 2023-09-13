import styles from "./index.module.css";

interface ITextArea {
  onChange: (e: any) => void;
  required?: boolean;
  error?: boolean;
  helperText?: any;
  value?: any;
  name?: string;
}

export default function TextArea(props: ITextArea) {
  return (
    <>
      <textarea
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        className={props.error ? styles.error : styles.container}
        rows={4}
      ></textarea>
    </>
  );
}
