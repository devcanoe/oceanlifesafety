import { Snackbar, Alert } from "@mui/material";

declare type SeverityType = "success" | "error";

interface ISToast {
  text: string | undefined;
  severity: SeverityType;
  open: boolean | undefined;
  onClose: () => void;
}

export default function SToast(props: ISToast) {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.open}
        autoHideDuration={2000}
        onClose={props.onClose}
      >
        <Alert
          onClose={props.onClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </>
  );
}
