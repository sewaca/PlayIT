import { Step1, Step2, HintAfter2Step, Step3 } from "./Steps";

interface RegistrationModalProps {
  step: 1 | 2 | "2+" | 3;
}

export default function RegistrationModal({ step }: RegistrationModalProps) {
  return step === 1 ? (
    <Step1 />
  ) : step === 2 ? (
    <Step2 />
  ) : step === "2+" ? (
    <HintAfter2Step />
  ) : step === 3 ? (
    <Step3 />
  ) : null;
}
