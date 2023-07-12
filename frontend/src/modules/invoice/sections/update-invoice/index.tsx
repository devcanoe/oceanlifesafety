import { InvoiceRow } from "../../modal/generateInvoice";
import styles from "./index.module.css";

interface IUpdateInvoice {
    refetch: () => void;
}

export default function UpdateInvoiceSection(props: IUpdateInvoice) {
    return (
        <>
            <InvoiceRow refetch={props.refetch} status={false}/>
        </>
    )
}