import type { Meta, StoryObj } from '@storybook/react-vite';

import Stepper from '../common/Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    totalSteps: {
      control: { type: 'number', min: 1, max: 10 },
      defaultValue: 5,
    },
    currentStep: {
      control: { type: 'number', min: 1, max: 10 },
      defaultValue: 2,
    },
    color: { control: 'text' },
    onStepChange: { action: 'stepChanged' },
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {
  args: {
    totalSteps: 5,
    currentStep: 2,
    color: 'bg-theme-primary',
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-semibold">3 steps / 현재 1단계</p>
        <Stepper totalSteps={3} currentStep={1} />
      </div>
      <div>
        <p className="mb-2 font-semibold">5 steps / 현재 3단계</p>
        <Stepper totalSteps={5} currentStep={3} />
      </div>
      <div>
        <p className="mb-2 font-semibold">
          7 steps / 현재 5단계 (custom color)
        </p>
        <Stepper totalSteps={7} currentStep={5} color="bg-red-500" />
      </div>
    </div>
  ),
};
