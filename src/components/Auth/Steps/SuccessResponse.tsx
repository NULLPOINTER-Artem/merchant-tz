import { Button } from "@mui/material";

interface SuccessResponseProps {
  heading: string;
  desc: string;
}

export default function SuccessResponse({
  heading,
  desc,
}: SuccessResponseProps) {
  return (
    <div className="success-response">
      <img
        className="success-response__icon"
        src={`${process.env.PUBLIC_URL}/assets/images/check-icon.png`}
        alt="complete green icon"
      />

      <h2 className="success-response__heading">{heading}</h2>
      <p className="success-response__desc">{desc}</p>

      <Button
        type="button"
        className="connected-store__btn-continue"
        variant="contained"
        color="primary"
        onClick={() => {}}
      >
        Done
      </Button>
    </div>
  );
}
