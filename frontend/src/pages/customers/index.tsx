import DashboardLayout from "@/common/layout/dashboard";
import CustomerContent from "@/modules/customers";

export default function Customer() {
    return (
        <>
            <DashboardLayout>
                <CustomerContent/>
            </DashboardLayout>
        </>
    )
}