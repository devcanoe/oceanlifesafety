import DashboardLayout from "@/common/layout/dashboard";
import CreateBACLContent from "@/modules/form/create-bacl";
import { useRouter } from "next/router";

export default function CreateBACL() {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        {router.isReady && <CreateBACLContent companyId={router.query.id} />}
      </DashboardLayout>
    </>
  );
}
