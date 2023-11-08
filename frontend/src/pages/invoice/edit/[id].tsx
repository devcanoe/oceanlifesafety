import DashboardLayout from "@/common/layout/dashboard"
import { InvoiceRow, UpdateInvoice } from "@/modules/invoice/modal/update-invoice";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EditInvoice = () => {

    const router = useRouter();

    return (
        <DashboardLayout>
            {
                router.isReady && (
                    <UpdateInvoice invoiceId={router.query.id}/>
                )
            }
        </DashboardLayout>
    )
}

export default EditInvoice;