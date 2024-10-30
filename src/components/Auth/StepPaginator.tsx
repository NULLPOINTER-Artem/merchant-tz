import { useMemo } from "react";
import SvgIconCustom from "../SvgIconCustom";
import { StepAuth, StepDirection, StepItem, StepStatus } from "./types";

interface StepPaginatorProps {
  classStyles?: string;
  steps: StepItem[];
  currentStep: StepItem;
  handleSwitchStep: (direction: StepDirection) => void;
}

export default function StepPaginator(props: StepPaginatorProps) {
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
    <>
      {hasCompletedStep && (
        <div className="auth-stepper__pagination">
          <button
            type="button"
            className="auth-stepper__pagination-btn is-back"
            disabled={props.currentStep.step === StepAuth.REGISTER}
            onClick={() => props.handleSwitchStep("back")}
          >
            <SvgIconCustom
              nameIcon="chevron"
              classStyles="auth-stepper__pagination-icon"
            />
            <span>Back</span>
          </button>
          <button
            type="button"
            className="auth-stepper__pagination-btn is-next"
            disabled={
              props.currentStep.step === StepAuth.DONE ||
              props.currentStep.status !== StepStatus.COMPLETED
            }
            onClick={() => props.handleSwitchStep("next")}
          >
            <span>Next</span>
            <SvgIconCustom
              nameIcon="chevron"
              classStyles="auth-stepper__pagination-icon"
            />
          </button>
        </div>
      )}
    </>
  );
}
