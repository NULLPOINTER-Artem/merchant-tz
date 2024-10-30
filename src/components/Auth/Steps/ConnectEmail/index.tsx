import { Button, CircularProgress, Step } from "@mui/material";
import { useState } from "react";
import SvgIconCustom from "../../../SvgIconCustom";
import { Responses, StepAuth, UserData } from "../../types";

import WithoutEmail from "./WithoutEmail";

type AbilityList = {
  id: number;
  label: string;
  desc: string;
};

interface ConnectEmailProps {
  handleComplete: (
    step: StepAuth,
    data: Omit<UserData, "email" | "name" | "password">
  ) => void;
  setupResponse: (val: Responses) => void;
  userData: UserData;
}

export default function ConnectEmail(props: ConnectEmailProps) {
  const abilityList: AbilityList[] = [
    {
      id: 1,
      label: "Contextual responses",
      desc: "Custom responses to any support situation from “where’s my stuff?” to “I want a refund”",
    },
    {
      id: 2,
      label: "Reply from anywhere",
      desc: "Respond to your customers via email or Chad chat—it’s all saved in the same thread",
    },
    {
      id: 3,
      label: "Categorical inbox tags",
      desc: "Tags your emails by category so you know what to expect before even opening an email",
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const connectEmail = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    props.handleComplete(StepAuth.CONNECT_SUPPORT_EMAIL, {
      emailConnected: true,
    });
    setIsSubmitting(false);
  };

  const [isShowSelectPlatform, setIsShowSelectPlatform] =
    useState<boolean>(false);
  const showSelectPlatform = (val: boolean) => {
    setIsShowSelectPlatform(val);
  };

  return (
    <>
      {isShowSelectPlatform ? (
        <>
          <WithoutEmail
            onBack={() => showSelectPlatform(false)}
            submit={props.setupResponse}
          />
        </>
      ) : (
        <div className="connect-email">
          <h2 className="connect-email__heading">
            Connect your customer support email
          </h2>
          <p className="connect-email__desc">
            Allows Chad to send automated responses on your behalf from your
            usual support mailbox
          </p>

          <div className="ability-list">
            {abilityList.map((abilityItem) => (
              <div className="ability-item" key={abilityItem.id}>
                <SvgIconCustom
                  nameIcon="completedIcon"
                  classStyles="ability-icon"
                />
                <div className="ability-wrapper">
                  <h3 className="ability-heading">{abilityItem.label}</h3>
                  <p className="ability-desc">{abilityItem.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="connect-email__btn-connect"
            variant="contained"
            color="primary"
            disabled={isSubmitting || props.userData.emailConnected}
            onClick={connectEmail}
          >
            <div className="connect-email__btn-connect__icon">
              <SvgIconCustom nameIcon="google-icon" />
            </div>
            Connect Gmail account
            {isSubmitting && (
              <CircularProgress
                className="connect-email__btn-loader"
                size={15}
              />
            )}
          </Button>

          <button
            type="button"
            className="connect-email__btn-cancel"
            disabled={isSubmitting || props.userData.emailConnected}
            onClick={() => showSelectPlatform(true)}
          >
            I don’t use Gmail
          </button>
        </div>
      )}
    </>
  );
}
