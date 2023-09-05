import DashboardLayout from "@/common/layout/dashboard";
import GenerateInvoiceContent from "@/modules/invoice/modal/generateInvoice";

export default function CreateInvoice() {
    return (
        <>
          <DashboardLayout>
            <GenerateInvoiceContent/>
          </DashboardLayout>
        </>
      );
}