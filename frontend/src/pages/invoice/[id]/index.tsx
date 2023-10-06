import DashboardLayout from "@/common/layout/dashboard";
import UpdateInvoiceContent from "@/modules/invoice/modal/update-invoice";
import UpdateInvoiceSection from "@/modules/invoice/sections/update-invoice";
import { useRouter } from "next/router";

export default function InvoiceView() {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        {router.isReady && <UpdateInvoiceContent invoiceId={router.query.id} />}
      </DashboardLayout>
    </>
  );
}
