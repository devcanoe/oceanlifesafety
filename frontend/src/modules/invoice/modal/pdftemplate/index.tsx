import { useFetchOneInvoiceQuery } from '@/common/services/invoice.service';
import styles from './index.module.css';
import { usePDF } from 'react-to-pdf';

const PDFTemplate = ({ forwardedRef, data }: { forwardedRef: React.RefObject<HTMLDivElement>, data: any[] }) => {

    // const { data, isLoading, isSuccess } = useFetchOneInvoiceQuery({id: ''});
   
    console.log(JSON.stringify(data))
    return (
        <>
            <section ref={forwardedRef} className={styles.container}>
                <nav>
                    <b>Invoice no: </b> {data.ref_no}
                </nav>
                <div>
                    <p><b> Due date: </b>{data.due_date}</p>
                    <p><b> Invoice date: </b>{data.invoice_date}</p>
                </div>
                <header className={styles.header}>
                    <aside className={styles.aside}>
                        <p><b>Receiver Name: </b>{data.receiver_name} </p>
                        <p><b>Receiver Company: </b>{data.receiver_company} </p>
                        <p><b>Receiver Address: </b> {data.receiver_address}</p>
                    </aside>
                    <aside className={styles.aside}>
                        <p><b>Sender Name: </b> {data.sender_name}</p>
                        <p><b>Sender Company: </b> {data.receiver_company}</p>
                        <p><b>Sender Address: </b> {data.receiver_address}</p>
                    </aside>
                </header>
                <main className={styles.main}>
                    <header className={styles.tableheader}>
                        <div>Description</div>
                        <div>Quantity</div>
                        <div>Price</div>
                        <div>Sub Total</div>
                    </header>
                    {data.items.map((table)=> {
                        return (
                            <>
                                <section className={styles.tablecontent}>
                                    <div>{table.description}</div>
                                    <div>{table.quantity}</div>
                                    <div>{table.price}</div>
                                    <div>{table.total}</div>
                                </section>
                            </>
                        )
                    })}
                </main>
                <div className={styles.numbers}>
                    <aside className={styles.totals}>
                        <p><b>SubTotal: </b> {data.subtotal}</p>
                        <p><b>VAT(12%): </b> {data.tax}</p>
                        <p><b>Total: </b> {data.total}</p>
                    </aside>
                </div>
                <footer className={styles.footer}>
                    <section>
                        <h5>Notes: </h5>
                        <p>{data.notes}</p>
                    </section>
                    <section>
                        <h5>Terms: </h5>
                        <p>{data.terms}</p>
                    </section>
                </footer>
            </section>
        </>
    )
}

export default PDFTemplate