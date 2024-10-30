import { Button, CircularProgress, InputBase } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import classNames from "classnames";
import { SyntheticEvent, useState } from "react";
import SvgIconCustom from "../../../SvgIconCustom";
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

function ChevronIcon() {
  return (
    <SvgIconCustom
      classStyles="without-shopify__select-icon"
      nameIcon="chevron"
    />
  );
}

interface WithoutShopifyProps {
  onBack: () => void;
  submit: (val: Responses) => void;
}

export default function WithoutShopify({
  onBack,
  submit,
}: WithoutShopifyProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("none");
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const selectPlatform = (event: SelectChangeEvent) => {
    if (!event.target.value) return;
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
      submit(Responses.SHOPIFY);
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
    <form className="without-shopify" onSubmit={onSubmit}>
      <h2 className="without-shopify__heading">Don’t use Shopify?</h2>
      <p className="without-shopify__desc">
        Chad Beta is currently only available on Shopify. We’ll send you an
        email when Chad becomes available on your platform.
      </p>

      <div className="without-shopify__wrapper">
        <div className="without-shopify__block">
          <label
            className="without-shopify__select-label"
            htmlFor="store-platform"
          >
            Platform
          </label>
          <Select
            className={classNames("without-shopify__select", {
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
              className={classNames("without-shopify__select-placeholder", {
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
          className="without-shopify__btn-submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
          {isSubmitting && (
            <CircularProgress
              className="without-shopify__btn-loader"
              size={15}
            />
          )}
        </Button>

        <div className="without-shopify__addition">
          <span>
            Actually use Shopify?{" "}
            <button
              className="link-reset without-shopify__back-btn"
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
