import DashboardLayout from "@/common/layout/dashboard";
import ViewticketContent from "@/modules/tickets/viewticket";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewTicket() {
  const router = useRouter();

  const [ticketId, setTicketId] = useState<string>("");

  useEffect(() => {
    if (router.isReady) {
      setTicketId(router.query.id);
    }
  }, [router.isReady]);

  return (
    <>
      {router.isReady && (
        <>
          <DashboardLayout>
            <ViewticketContent ticketId={ticketId} />
          </DashboardLayout>
        </>
      )}
    </>
  );
}
