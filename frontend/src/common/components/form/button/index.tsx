import { Icon } from "@iconify/react";
import styles from "./index.module.css";

interface IButton {
  label?: string;
  onClick: (e: any) => void;
  icon?: any;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
}

export default function Button(props: IButton) {
  return (
    <>
      <button
        type={props.type}
        className={styles.container}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.isLoading ? (
          <Icon icon="eos-icons:loading" color="white" />
        ) : (
          <>
            {props.icon && props.icon}
            {props.label && props.label}
          </>
        )}
      </button>
    </>
  );
}
