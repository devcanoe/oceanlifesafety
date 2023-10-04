import DashboardLayout from "@/common/layout/dashboard";
import EmployeeContent from "@/modules/employees";

export default function Employee() {
  return (
    <>
      <DashboardLayout>
        <EmployeeContent />
      </DashboardLayout>
    </>
  );
}
