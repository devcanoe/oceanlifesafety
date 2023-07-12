import DashboardLayout from "@/common/layout/dashboard";
import UpdateInvoiceSection from "@/modules/invoice/sections/update-invoice";

export default function InvoiceView() {
    return (
        <>
            <DashboardLayout>
                <UpdateInvoiceSection refetch={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
            </DashboardLayout>
        </>
    )
}