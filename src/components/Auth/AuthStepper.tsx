import classNames from "classnames";
import { useMemo } from "react";
import SvgIconCustom from "../SvgIconCustom";

/* Types */
import { StepStatus, StepItem, StepAuth, StepDirection } from "./types";

interface PathLineProps {
  isPassed: boolean;
}

function PathLine(props: PathLineProps) {
  return (
    <div
      className={classNames("path-line", {
        "is-passed": props.isPassed,
      })}
    ></div>
  );
}

interface PathCircleProps {
  status: StepStatus;
}

function PathCircle(props: PathCircleProps) {
  return (
    <div
      className={classNames("path-circle", {
        "is-active": props.status === StepStatus.ACTIVE,
        "is-active-completed": props.status === StepStatus.ACTIVE_COMPLETED,
        "is-completed": props.status === StepStatus.COMPLETED,
        "is-no-passed-completed":
          props.status === StepStatus.NO_PASSED_COMPLETED,
      })}
    >
      <SvgIconCustom classStyles="path-circle__icon" nameIcon="completedIcon" />
    </div>
  );
}

interface AuthStepperProps {
  classStyles?: string;
  steps: StepItem[];
  currentStep: StepItem;
  handleSwitchStep: (direction: StepDirection) => void;
}

export default function AuthStepper(props: AuthStepperProps) {
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
    <div className={classNames("auth-stepper", props.classStyles)}>
      <div className="auth-stepper__list">
        {props.steps.map((item) => (
          <div className="auth-stepper__list-item" key={item.id}>
            <div className="auth-stepper__list-wrapper">
              <PathCircle status={item.status} />
              <span
                className={classNames("auth-stepper__list-label", {
                  "is-active":
                    item.status !== StepStatus.NO_PASSED &&
                    item.status !== StepStatus.NO_PASSED_COMPLETED,
                })}
              >
                {item.label}
              </span>
            </div>

            {item.step !== StepAuth.DONE && (
              <PathLine isPassed={item.id < props.currentStep.id} />
            )}
          </div>
        ))}
      </div>

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
    </div>
  );
}
