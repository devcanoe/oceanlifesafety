import DashboardLayout from "@/common/layout/dashboard";
import Viewclient from "@/modules/clients/Viewclient";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        <Viewclient />
      </DashboardLayout>
    </>
  );
}
