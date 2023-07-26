import DashboardLayout from "@/common/layout/dashboard";
import ViewticketContent from "@/modules/tickets/viewticket";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ViewType() {
  return (
    <>
      <DashboardLayout>
        <ViewticketContent />
      </DashboardLayout>
    </>
  );
}
