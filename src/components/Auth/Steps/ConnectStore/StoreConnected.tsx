import { Button } from "@mui/material";
import classNames from "classnames";
import { useEffect } from "react";
import { StepAuth, UserData } from "../../types";

interface StoreConnectedProps {
  isConnected: boolean;
  onBack: () => void;
  setupMessage: (val: boolean) => void;
  handleComplete: (
    step: StepAuth,
    data: Omit<UserData, "email" | "name" | "password">
  ) => void;
}

export default function StoreConnected({
  isConnected,
  onBack,
  handleComplete,
  setupMessage,
}: StoreConnectedProps) {
  const onContinue = () => {
    handleComplete(StepAuth.CONNECT_STORE, {
      storeConnected: true,
    });
    setupMessage(false);
  };

  useEffect(() => {
    if (isConnected) {
      setupMessage(true);
    }
  }, []);

  return (
    <div className="connected-store">
      <div className="connected-store__image-block">
        <img
          className="connected-store__image"
          src={`${process.env.PUBLIC_URL}/assets/images/shopify-avatar.png`}
          alt="raccoon happy face"
        />
      </div>

      <div className="connected-store__wrapper">
        <h2
          className={classNames("connected-store__heading", {
            "is-connected": isConnected,
          })}
        >
          {isConnected ? (
            <>
              <span className="connected-store__name">[STORE-NAME]</span>{" "}
              already connected
            </>
          ) : (
            "Store Connected"
          )}
        </h2>
        {!isConnected && (
          <p className="connected-store__desc">
            Chad is now able to manage customer support requests for{" "}
            <span className="connected-store__name">[STORE-NAME]</span>.
          </p>
        )}

        <Button
          type="button"
          className="connected-store__btn-continue"
          variant="contained"
          color="primary"
          onClick={onContinue}
        >
          Continue
        </Button>

        <div className="connected-store__back-block">
          <span>
            {isConnected ? "Not your store? " : "Wrong store? "}
            <button
              className="link-reset connected-store__back-btn"
              type="button"
              onClick={onBack}
            >
              Connect another one
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
