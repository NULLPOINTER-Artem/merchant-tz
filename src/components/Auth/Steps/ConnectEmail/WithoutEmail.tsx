import { Button, CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import classNames from "classnames";
import { SyntheticEvent, useState } from "react";
import SvgIconCustom from "../../../SvgIconCustom";
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

function ChevronIcon() {
  return (
    <SvgIconCustom
      classStyles="email-platform-form__select-icon"
      nameIcon="chevron"
    />
  );
}

interface WithoutEmailProps {
  onBack: () => void;
  submit: (val: Responses) => void;
}

export default function WithoutEmail({ onBack, submit }: WithoutEmailProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("none");
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const selectPlatform = (event: SelectChangeEvent) => {
    setSelectedPlatform(event.target.value);
    setShowPlaceholder(false);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      if (!selectedPlatform || selectedPlatform === "none") return;

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      submit(Responses.EMAIL);
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const onOpen = () => {
    setIsOpenSelect(true);
  };
  const onClose = () => {
    setIsOpenSelect(false);
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
            className={classNames("email-platform-form__select", {
              "has-placeholder": showPlaceholder,
              "is-open": isOpenSelect,
            })}
            id="store-platform"
            value={selectedPlatform}
            IconComponent={ChevronIcon}
            onChange={selectPlatform}
            onOpen={onOpen}
            onClose={onClose}
          >
            <MenuItem
              value="none"
              disabled
              className={classNames("email-platform-form__select-placeholder", {
                "is-hidden": !showPlaceholder,
              })}
            >
              Select platform
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
