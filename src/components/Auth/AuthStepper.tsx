import classNames from "classnames";
import SvgIconCustom from "../SvgIconCustom";
import StepPaginator from "./StepPaginator";

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

      <StepPaginator
        steps={props.steps}
        currentStep={props.currentStep}
        handleSwitchStep={props.handleSwitchStep}
      />
    </div>
  );
}
