import { useState } from "react";

/* Components */
import SvgIconCustom from "./../components/SvgIconCustom";
import RegisterForm from "../components/Auth/RegisterForm";
import AuthStepper from "../components/Auth/AuthStepper";

/* Types */
import {
  StepAuth,
  StepDirection,
  StepItem,
  StepStatus,
} from "../components/Auth/types";
import AdviceSlider from "../components/Auth/AdviceSlider";
import ConnectStore from "../components/Auth/ConnectStore";

function Auth() {
  const [steps, setSteps] = useState<StepItem[]>([
    {
      id: 1,
      label: "Welcome",
      step: StepAuth.REGISTER,
      status: StepStatus.ACTIVE,
    },
    {
      id: 2,
      label: "Connect your Shopify store",
      step: StepAuth.CONNECT_STORE,
      status: StepStatus.NO_PASSED,
    },
    {
      id: 3,
      label: "Connect your customer support email",
      step: StepAuth.CONNECT_SUPPORT_EMAIL,
      status: StepStatus.NO_PASSED,
    },
    {
      id: 4,
      label: "Done",
      step: StepAuth.DONE,
      status: StepStatus.NO_PASSED,
    },
  ]);
  const [currentStepAuth, setCurrentStepAuth] = useState<StepItem>(steps[0]);

  const handleComplete = (step: StepAuth) => {
    if (step === StepAuth.DONE) return;

    const currentStepIndex = steps.findIndex((item) => item.step === step);
    if (currentStepIndex < 0) return;

    setSteps(
      steps.map((stepItem) => ({
        ...stepItem,
        status:
          stepItem.status === StepStatus.COMPLETED || stepItem.step === step
            ? StepStatus.COMPLETED
            : stepItem.step === steps[currentStepIndex + 1].step
            ? StepStatus.ACTIVE
            : stepItem.step === steps[currentStepIndex + 1].step &&
              stepItem.status === StepStatus.ACTIVE
            ? StepStatus.ACTIVE_COMPLETED
            : StepStatus.NO_PASSED,
      }))
    );
    setCurrentStepAuth(steps[currentStepIndex + 1]);
  };

  const handleSwitchStep = (direction: StepDirection) => {
    let isBack = false;

    if (direction === "back") {
      if (currentStepAuth.step === StepAuth.REGISTER) return;
      isBack = true;
    } else {
      if (
        currentStepAuth.step === StepAuth.DONE ||
        currentStepAuth.status !== StepStatus.COMPLETED
      )
        return;
    }

    const currentStepIndex = steps.findIndex(
      (item) => item.step === currentStepAuth.step
    );
    if (currentStepIndex < 0) return;
    const nextStepItem = isBack
      ? steps[currentStepIndex - 1]
      : steps[currentStepIndex + 1];
    const theCurrStepItem = steps[currentStepIndex];

    setSteps(
      steps.map((stepItem) => ({
        ...stepItem,
        status:
          stepItem.status === nextStepItem.status &&
          stepItem.status === StepStatus.COMPLETED
            ? StepStatus.ACTIVE_COMPLETED
            : stepItem.id === theCurrStepItem.id &&
              stepItem.status === StepStatus.ACTIVE_COMPLETED
            ? StepStatus.COMPLETED
            : stepItem.status,
      }))
    );

    setCurrentStepAuth(nextStepItem);
  };

  return (
    <div className="register-page">
      <div className="register-page__progress">
        <AuthStepper
          classStyles="register-page__stepper"
          steps={steps}
          currentStep={currentStepAuth}
          handleSwitchStep={handleSwitchStep}
        />

        <AdviceSlider classStyles="register-page__advice-list" />
      </div>

      <div className="register-page__form">
        <h1 className="register-page__form-heading">
          <SvgIconCustom
            classStyles="register-page__form-logo"
            nameIcon="logoIcon"
          />
          <span>Chad</span>
        </h1>

        {currentStepAuth.step === StepAuth.REGISTER ? (
          <RegisterForm handleComplete={handleComplete} />
        ) : (
          <ConnectStore handleComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}

export default Auth;
