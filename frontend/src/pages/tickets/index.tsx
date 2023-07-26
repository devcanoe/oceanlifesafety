import DashboardLayout from "@/common/layout/dashboard";
import TicketContent from "@/modules/tickets";

export default function Tickets() {
  return (
    <>
      <DashboardLayout>
        <TicketContent />
      </DashboardLayout>
    </>
  );
}
