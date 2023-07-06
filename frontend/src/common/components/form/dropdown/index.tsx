import styles from "./index.module.css";

interface IDropdown {
  label: string;
  disabled: boolean;
  items: Iitem[];
  onChange: (e: any) => void;
  required?: boolean;
  error?: boolean;
  helperText?: any;
  value?: any;
  name?: string;
  select?: boolean;
}

export interface Iitem {
  id: string | undefined;
  title: string | undefined;
  value: string | undefined;
}

export default function Dropdown(props: IDropdown) {
  // map select items
  const options = props.items.map((item: Iitem, index: number) => {
    return (
      <option key={index} value={item.value} selected={props.select}>
        {" "}
        {item.title}{" "}
      </option>
    );
  });

  return (
    <>
     <div className={styles.maincontainer}>
        <small>{props.label}</small>
        <select
          name={props.name}
          className={styles.container}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
          required
        >
          <option>{props.label}</option>
          {options}
        </select>
      {props.error && (
        <small className={styles.error}>{props.helperText}</small>
      )}
    </div>
    </>
  );
}
