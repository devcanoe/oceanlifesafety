import DashboardLayout from "@/common/layout/dashboard";
import CreateEEPDContent from "@/modules/form/create-eepd";
import { useRouter } from "next/router";

export default function CreateEEBD() {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        {router.isReady && <CreateEEPDContent companyId={router.query.id} />}
      </DashboardLayout>
    </>
  );
}
