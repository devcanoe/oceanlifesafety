import Button from "@/common/components/form/button";

interface DeleteCompanyProps {
  close: () => void;
  action: () => void;
}

export default function DeleteCompany(props: DeleteCompanyProps) {
  return (
    <>
      <div>
        <Button />
      </div>
    </>
  );
}
