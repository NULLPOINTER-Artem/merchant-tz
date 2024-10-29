export enum StepAuth {
  REGISTER = "REGISTER",
  CONNECT_STORE = "CONNECT_STORE",
  CONNECT_SUPPORT_EMAIL = "CONNECT_SUPPORT_EMAIL",
  DONE = "DONE",
}

export enum StepStatus {
  ACTIVE = "ACTIVE",
  ACTIVE_COMPLETED = "ACTIVE_COMPLETED",
  COMPLETED = "COMPLETED",
  NO_PASSED_COMPLETED = "NO_PASSED_COMPLETED",
  NO_PASSED = "NO_PASSED",
}

export type StepItem = {
  id: number;
  label: string;
  step: StepAuth;
  status: StepStatus;
};

export type StepDirection = "back" | "next";

export enum Responses {
  NONE = "NONE",
  SHOPIFY = "SHOPIFY",
  EMAIL = "EMAIL",
}
