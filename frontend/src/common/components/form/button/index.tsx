import { Icon } from "@iconify/react";
import styles from "./index.module.css";

interface IButton {
  label?: string;
  onClick: (e: any) => void;
  icon?: any;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  button: "primary" | "delete"
}

export default function Button(props: IButton) {
  return (
    <>
      <button
        type={props.type}
        className={props.button === "delete" ? styles.removecontainer : styles.container}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.isLoading ? (
          "Loading..."
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
