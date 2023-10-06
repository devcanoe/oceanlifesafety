import DashboardLayout from "@/common/layout/dashboard";
import FilemanagerContent from "@/modules/filemanager";

export default function FileManager() {
  return (
    <>
      <DashboardLayout>
        <FilemanagerContent />
      </DashboardLayout>
    </>
  );
}
