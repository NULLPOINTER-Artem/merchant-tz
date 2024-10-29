import { Button, CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SyntheticEvent, useState } from "react";
import { Responses } from "../../types";

const platformList: string[] = [
  "Outlook",
  "ProtonMail",
  "Zoho Mail",
  "Mail.com",
  "Tutanota",
  "StartMail",
  "Mailfence",
  "iCloud Mail",
];

interface WithoutEmailProps {
  onBack: () => void;
  submit: (val: Responses) => void;
}

export default function WithoutEmail({ onBack, submit }: WithoutEmailProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  const selectPlatform = (event: SelectChangeEvent) => {
    setSelectedPlatform(event.target.value);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      if (!selectedPlatform) return;

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      submit(Responses.SHOPIFY);
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="email-platform-form" onSubmit={onSubmit}>
      <h2 className="email-platform-form__heading">Don’t use Gmail?</h2>
      <p className="email-platform-form__desc">
        Chad Beta is currently only integrated with Gmail. We’ll send you an
        email when Chad becomes compatible with your support ticket platform.
      </p>

      <div>
        <div className="email-platform-form__block">
          <label
            className="email-platform-form__select-label"
            htmlFor="store-platform"
          >
            Platform
          </label>
          <Select
            className="email-platform-form__select"
            id="store-platform"
            value={selectedPlatform}
            onChange={selectPlatform}
            placeholder="Select platform"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {platformList.map((platformItem) => (
              <MenuItem value={platformItem} key={platformItem}>
                {platformItem}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button
          type="submit"
          className="email-platform-form__btn-submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
          {isSubmitting && (
            <CircularProgress
              className="email-platform-form__btn-loader"
              size={15}
            />
          )}
        </Button>

        <div className="email-platform-form__addition">
          <span>
            Actually use Gmail?{" "}
            <button
              className="link-reset email-platform-form__back-btn"
              type="button"
              onClick={onBack}
            >
              Connect
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}
