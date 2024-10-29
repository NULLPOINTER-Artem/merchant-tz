import { Button, CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SyntheticEvent, useState } from "react";
import { Responses } from "../../types";

const platformList: string[] = [
  "BigCommerce",
  "Shift4Shop",
  "Squarespace",
  "Wix",
  "Ecwid",
  "WooCommerce",
  "Amazon",
  "eBay",
];

interface WithoutShopifyProps {
  onBack: () => void;
  submit: (val: Responses) => void;
}

export default function WithoutShopify({
  onBack,
  submit,
}: WithoutShopifyProps) {
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
    <form className="store-platform-form" onSubmit={onSubmit}>
      <h2 className="register-form__heading">Don’t use Shopify?</h2>
      <p className="register-form__desc">
        Chad Beta is currently only available on Shopify. We’ll send you an
        email when Chad becomes available on your platform.
      </p>

      <div>
        <div className="register-form__block">
          <label
            className="register-form__input-label"
            htmlFor="store-platform"
          >
            Platform
          </label>
          <Select
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
          className="connect-store__btn-connect"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
          {isSubmitting && (
            <CircularProgress className="connect-store__btn-loader" size={15} />
          )}
        </Button>

        <div className="register-form__addition">
          <span>
            Actually use Shopify?{" "}
            <button
              className="link-reset connected-store__back-btn"
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
