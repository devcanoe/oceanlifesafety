import DashboardLayout from "@/common/layout/dashboard";
import CompanyContent from "@/modules/company";
import InvoiceContent from "@/modules/invoice";

export default function Invoice() {
    return (
        <>
            <DashboardLayout>
                <InvoiceContent/>
            </DashboardLayout>
        </>
    )
}