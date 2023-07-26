import DashboardLayout from "@/common/layout/dashboard";
import CreateEEPDContent from "@/modules/form/create-eepd";
import CreatePFECLContent from "@/modules/form/create-pfecl";
import { useRouter } from "next/router";

export default function CreatePFECL() {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        {router.isReady && <CreatePFECLContent companyId={router.query.id} />}
      </DashboardLayout>
    </>
  );
}
