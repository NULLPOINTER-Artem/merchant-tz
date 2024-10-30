import { useMemo, useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import StepPaginator from "./StepPaginator";
import { StepDirection, StepItem, StepStatus } from "./types";
import classNames from "classnames";

interface MobileStepperCustomProps {
  classStyles?: string;
  steps: StepItem[];
  currentStep: StepItem;
  activeStep: number;
  handleSwitchStep: (direction: StepDirection) => void;
}

export function MobileStepperCustom(props: MobileStepperCustomProps) {
  const hasCompletedStep = useMemo(
    () =>
      props.steps.some(
        (item) =>
          item.status === StepStatus.COMPLETED ||
          item.status === StepStatus.ACTIVE_COMPLETED
      ),
    [props.currentStep]
  );

  return (
    <div className="mobile-stepper">
      <div className="mobile-stepper__count-block">
        Step {props.activeStep} of {props.steps.length}
      </div>

      <MobileStepper
        className={classNames("mobile-stepper__component", {
          "is-open": hasCompletedStep,
        })}
        variant="progress"
        position="static"
        steps={props.steps.length + 1}
        activeStep={props.activeStep}
        nextButton={null}
        backButton={null}
      />

      <StepPaginator
        steps={props.steps}
        currentStep={props.currentStep}
        handleSwitchStep={props.handleSwitchStep}
      />
    </div>
  );
}
