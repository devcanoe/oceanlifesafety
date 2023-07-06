import styles from './index.module.css';

export default function FileUploader() {
    return (
        <>
            <input className={styles.container} type="file" id="files" name="files" multiple></input>
        </>
    )
}