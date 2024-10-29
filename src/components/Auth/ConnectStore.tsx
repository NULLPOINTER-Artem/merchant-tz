import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import SvgIconCustom from "../SvgIconCustom";
import { StepAuth } from "./types";

type AbilityList = {
  id: number;
  label: string;
  desc: string;
};

interface ConnectStoreProps {
  handleComplete: (step: StepAuth) => void;
}

export default function ConnectStore(props: ConnectStoreProps) {
  const abilityList: AbilityList[] = [
    {
      id: 1,
      label: "Track orders and shipping",
      desc: "Global coverage with 600+ couriers supported",
    },
    {
      id: 2,
      label: "Manage orders",
      desc: "Allow customers to track, return, exchange, or report problems with their orders",
    },
    {
      id: 3,
      label: "Process returns and exchanges",
      desc: "Automatically checks your store policy and existing inventory before resolving or escalating each request",
    },
  ];
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const connectStore = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    props.handleComplete(StepAuth.CONNECT_STORE);
    setIsSubmitting(false);
  };

  return (
    <div className="connect-store">
      <h2 className="connect-store__heading">Connect your Shopify store</h2>
      <p className="connect-store__desc">
        Installs the Chad widget in your Shopify store and sets it up to display
        your customers’ order information and self-serve options.
      </p>

      <div className="connect-store__ability-list">
        {abilityList.map((abilityItem) => (
          <div className="connect-store__ability-item" key={abilityItem.id}>
            <SvgIconCustom
              nameIcon="completedIcon"
              classStyles="connect-store__ability-icon"
            />
            <div className="connect-store__ability-wrapper">
              <h3 className="connect-store__ability-heading">
                {abilityItem.label}
              </h3>
              <p className="connect-store__ability-desc">{abilityItem.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="connect-store__btn-connect"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        onClick={connectStore}
      >
        Connect store
        {isSubmitting && (
          <CircularProgress className="connect-store__btn-loader" size={15} />
        )}
      </Button>

      <button type="button" className="connect-store__btn-cancel">
        I don’t use Shopify
      </button>
    </div>
  );
}
