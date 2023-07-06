import { Icon } from "@iconify/react";
import styles from "./index.module.css";

interface ILoader {
  status: boolean | undefined;
}

export default function Loader({ status }: ILoader) {
  return (
    <>
      {status && (
        <section className={styles.container}>
          <p>
            <Icon
              icon="eos-icons:loading"
              color="blue"
              height={50}
              width={50}
            />
          </p>
        </section>
      )}
    </>
  );
}
