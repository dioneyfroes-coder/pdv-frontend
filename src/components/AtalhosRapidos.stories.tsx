import type { Meta, StoryObj } from '@storybook/react';

import AtalhosRapidos from './AtalhosRapidos';

const meta = {
  component: AtalhosRapidos,
} satisfies Meta<typeof AtalhosRapidos>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};