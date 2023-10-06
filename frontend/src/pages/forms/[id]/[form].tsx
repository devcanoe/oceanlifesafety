import DashboardLayout from "@/common/layout/dashboard";
import UpdateEEPDContent from "@/modules/form/update-eepd";
import { useRouter } from "next/router";

export default function UpdateEEBD() {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        {router.isReady && (
          <UpdateEEPDContent
            formId={router.query.form}
            companyId={router.query.id}
          />
        )}
      </DashboardLayout>
    </>
  );
}
