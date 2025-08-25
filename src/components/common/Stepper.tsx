type StepperProps = {
  totalSteps: number;
  currentStep: number;
  onStepChange?: (step: number) => void;
  color?: string;
};
// Stepper 컴포넌트
// totalSteps: 총 스텝 수
// currentStep: 현재 스텝 (1부터 시작)
// onStepChange: 스텝 변경 시 호출되는 콜백 함수
// color: 진행된 스텝의 색상 (기본값: 'bg-theme-primary')
export default function Stepper({
  totalSteps,
  currentStep,
  onStepChange,
  color,
}: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const activeColorClass = color || 'bg-theme-primary';
  const handleStepClick = (step: number) => {
    if (onStepChange) {
      onStepChange(step);
    }
  };

  return (
    <div className="flex space-x-1 w-full">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-16 h-1 rounded-lg ${
            step <= currentStep ? activeColorClass : 'bg-line-light'
          }`}
          onClick={() => handleStepClick(step)}
        ></div>
      ))}
    </div>
  );
}
