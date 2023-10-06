import TableContent, { Data } from "@/common/components/table/tableLayout";
import styles from "./index.module.css";

export default function ExplorerContent() {
  return (
    <>
      <section>
        <TableContent data={demoData} />
      </section>
    </>
  );
}

const demoData: Data[] = [
  {
    type: "folder",
    name: "Amazon",
  },
  {
    type: "file",
    name: "Apple",
  },
  {
    type: "pdf",
    name: "Amazon",
  },
  {
    type: "excel",
    name: "Apple",
  },
];
