import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Components */
import SvgIconCustom from "./../components/SvgIconCustom";
import RegisterForm from "../components/Auth/Steps/RegisterForm";
import AuthStepper from "../components/Auth/AuthStepper";
import SuccessResponse from "../components/Auth/Steps/SuccessResponse";

/* Types */
import {
  Responses,
  StepAuth,
  StepDirection,
  StepItem,
  StepStatus,
  UserData,
} from "../components/Auth/types";
import AdviceSlider from "../components/Auth/AdviceSlider";
import ConnectStore from "../components/Auth/Steps/ConnectStore";
import ConnectEmail from "../components/Auth/Steps/ConnectEmail";
import { MobileStepperCustom } from "../components/Auth/MobileStepperCustom";

function Auth() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    emailConnected: false,
    password: "",
    name: "",
    storeConnected: true,
    isAccountCreated: false,
  });

  const resetStoreConnection = () => {
    setUserData((prevData) => ({
      ...prevData,
      storeConnected: false,
    }));
  };

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

  useEffect(() => {
    if (userData.storeConnected) {
      setSteps(
        steps.map((item) => ({
          ...item,
          status: item.id === 2 ? StepStatus.NO_PASSED_COMPLETED : item.status,
        }))
      );
    }
  }, []);

  const setStepStatus = (
    stepItem: StepItem,
    currentStepIndex: number,
    step: StepAuth
  ) => {
    if (stepItem.status === StepStatus.NO_PASSED_COMPLETED) {
      return StepStatus.ACTIVE_COMPLETED;
    }

    return stepItem.status === StepStatus.COMPLETED || stepItem.step === step
      ? StepStatus.COMPLETED
      : stepItem.id === steps[currentStepIndex + 1].id
      ? StepStatus.ACTIVE
      : stepItem.id === steps[currentStepIndex + 1].id &&
        stepItem.status === StepStatus.ACTIVE
      ? StepStatus.ACTIVE_COMPLETED
      : stepItem.status;
  };

  const handleComplete = (
    step: StepAuth,
    data: null | UserData | Omit<UserData, "email" | "name" | "password"> = null
  ) => {
    if (step === StepAuth.CONNECT_SUPPORT_EMAIL) {
      navigate("/hello-page");
      return;
    }

    const currentStepIndex = steps.findIndex((item) => item.step === step);
    if (currentStepIndex < 0) return;

    setSteps(
      steps.map((stepItem) => ({
        ...stepItem,
        status: setStepStatus(stepItem, currentStepIndex, step),
      }))
    );
    setCurrentStepAuth(steps[currentStepIndex + 1]);

    if (data !== null) {
      setUserData((prevData) => ({
        ...prevData,
        ...data,
      }));
    }
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
          stepItem.id === nextStepItem.id &&
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

  const [hasMessage, setHasMessage] = useState<boolean>(false);
  const setupMessage = (val: boolean) => {
    setHasMessage(val);
  };

  const [successResponse, setSuccessResponse] = useState<Responses>(
    Responses.NONE
  );
  const setupResponse = (val: Responses) => {
    setSuccessResponse(val);
  };

  const outputResponse = () => {
    return (
      <>
        {successResponse === Responses.SHOPIFY ? (
          <SuccessResponse
            heading="Response received"
            desc="Thank you for your interest in Chad! We’ll be hard at work building integrations to support your platform."
          />
        ) : successResponse === Responses.EMAIL ? (
          <SuccessResponse
            heading="Response received"
            desc="Thank you for your interest in Chad! We’ll be hard at work building integrations to support your email client."
          />
        ) : null}
      </>
    );
  };
  const outputCurrentStep = () => {
    return (
      <>
        {currentStepAuth.step === StepAuth.REGISTER ? (
          <RegisterForm userData={userData} handleComplete={handleComplete} />
        ) : currentStepAuth.step === StepAuth.CONNECT_STORE ? (
          <ConnectStore
            handleComplete={handleComplete}
            setupMessage={setupMessage}
            hasMessage={hasMessage}
            setupResponse={setupResponse}
            userData={userData}
            resetStoreConnection={resetStoreConnection}
          />
        ) : currentStepAuth.step === StepAuth.CONNECT_SUPPORT_EMAIL ? (
          <ConnectEmail
            handleComplete={handleComplete}
            setupResponse={setupResponse}
            userData={userData}
          />
        ) : null}
      </>
    );
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
        {!hasMessage && successResponse === Responses.NONE && (
          <>
            <h1 className="register-page__form-heading">
              <SvgIconCustom
                classStyles="register-page__form-logo"
                nameIcon="logoIcon"
              />
              <span>Chad</span>
            </h1>
            <MobileStepperCustom
              activeStep={currentStepAuth.id}
              steps={steps}
              currentStep={currentStepAuth}
              handleSwitchStep={handleSwitchStep}
            />
          </>
        )}

        {successResponse !== Responses.NONE
          ? outputResponse()
          : outputCurrentStep()}
      </div>
    </div>
  );
}

export default Auth;
