import DashboardLayout from "@/common/layout/dashboard";
import CreateEEPDContent from "@/modules/form/create-eepd";

export default function Dashboard() {
    return (
        <>
            <DashboardLayout>
                <CreateEEPDContent/>
            </DashboardLayout>
        </>
    )
}