import type { Meta, StoryObj } from '@storybook/react';

import PdvLayout from './PdvLayout';

const meta = {
  component: PdvLayout,
} satisfies Meta<typeof PdvLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};